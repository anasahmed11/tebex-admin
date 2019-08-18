import React from 'react';
import { ClipLoader } from 'react-spinners';

import { withStyles, Grid, Typography, IconButton, Snackbar, } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'typeface-roboto';

import CustomMaterialTable from '../parts/CustomMaterialTable';
import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from '../../../assets/jss/components/wrappers/SellingOrders';
import { orderAPI } from '../../../api/api';
import { Link } from 'react-router-dom'
import MySnackbar from '../parts/MySnackbar';


const columns = [
    { title: 'Name', field: 'product.name' },
    { title: 'Price', field: 'price', type: "numeric" },
    { title: 'Qunatity', field: 'quantity', type: "numeric" },
    { title: 'Order ID', field: 'order_id', type: "numeric" },
    { title: 'Order Status', field: 'order.status' },
    { title: 'Buyer Name', field: 'buyerName' },
]


class SellingOrders extends React.Component {
    state = {
        isLoading: true,
        pendingProducts: [],
        processingProducts: [],
        completedProducts: [],

        isPopup: false,
        serverMessage: '',
        messageType: 'success',
    }

    pendingPromises = [];
    componentWillUnmount = () =>
        this.pendingPromises.map(p => p.cancel());
    appendPendingPromise = promise =>
        this.pendingPromises = [...this.pendingPromises, promise];
    removePendingPromise = promise =>
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);


    handleProductAction = (data) => {
        this.setState({ isLoading: true })

        const wrappedPromise = cancelablePromise(orderAPI.post('/seller-pending', data));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                const pendingProducts = this.state.pendingProducts.filter(pendingProduct => pendingProduct.order_id != data.order_id || pendingProduct.product_id != data.product_id)
                this.setState({
                    isPopup: true,
                    serverMessage: res.data.message,
                    messageType: 'success',
                    isLoading: false,
                    pendingProducts: pendingProducts,
                })
                this.getCompletedPrdos();
                this.getProcessingPrdos();
            })
            .catch(res => {
                this.setState({
                    isPopup: true,
                    serverMessage: 'Error occured try again later or contact support',
                    messageType: 'error',
                    isLoading: false,
                })
            })

    }


    getPendingPrdos = () => {
        const wrappedPromise = cancelablePromise(orderAPI('/seller-pending'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                res.data.map(item => {
                    item.buyerName = item.order.address.first_name + ' ' + item.order.address.last_name;
                    item.product.name = <Link to={`/product/${item.product_id}`}>{item.product.name}</Link>
                    item.action = <div>
                        <IconButton onClick={() => this.handleProductAction({ order_id: item.order_id, product_id: item.product_id, status: 'confirmed' })}><FontAwesomeIcon icon="check" /></IconButton>
                        <IconButton onClick={() => this.handleProductAction({ order_id: item.order_id, product_id: item.product_id, status: 'refused' })}><FontAwesomeIcon icon="times" /></IconButton>
                    </div>
                })
                this.setState({ pendingProducts: res.data, isLoading: false })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            })
    }

    getProcessingPrdos = () => {
        const wrappedPromise = cancelablePromise(orderAPI('/seller-processing'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                res.data.map(item => {
                    item.buyerName = item.order.address.first_name + ' ' + item.order.address.last_name;
                    item.product.name = <Link to={`/product/${item.product_id}`}>{item.product.name}</Link>
                })
                this.setState({ processingProducts: res.data, isLoading: false })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            })
    }
    getCompletedPrdos = () => {
        const wrappedPromise = cancelablePromise(orderAPI('/seller-completed'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                res.data.map(item => {
                    item.buyerName = item.order.address.first_name + ' ' + item.order.address.last_name;
                    item.product.name = <Link to={`/product/${item.product_id}`}>{item.product.name}</Link>
                })
                this.setState({ completedProducts: res.data, isLoading: false })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            })
    }

    componentDidMount() {
        this.getPendingPrdos();
        this.getProcessingPrdos();
        this.getCompletedPrdos();

    }

    render() {

        const { classes } = this.props;
        const { isLoading, isPopup, messageType, serverMessage } = this.state;
        return (
            <Grid container item justify='center' xs={11}>

                <Snackbar
                    style={{ bottom: '50px' }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={isPopup}
                    autoHideDuration={6000}
                    onClose={this.handlePopupClose}
                >
                    <MySnackbar
                        className={classes.margin}
                        onClose={this.handlePopupClose}
                        variant={messageType}
                        message={serverMessage}

                    />
                </Snackbar>


                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>اوردرات </Typography>
                </Grid>
                <Grid container spacing={2} item xs={12}>
                    {isLoading ?
                        <Grid container alignItems="center" justify="center" >
                            <ClipLoader
                                sizeUnit={"px"}
                                size={75}
                                color={'#123abc'}
                                loading={isLoading}
                            />
                        </Grid> : <React.Fragment>
                            <CustomMaterialTable data={this.state.pendingProducts} columns={[...columns, { title: '', field: 'action' }]} title={'الاوردرات المعلقة'} /*onRowUpdatePromise={this.handleEdit} data={data} columns={columns}*/ />
                            <CustomMaterialTable data={this.state.processingProducts} columns={columns} title={'الاودرات في الشحن'} /*onRowUpdatePromise={this.handleEdit} data={data} columns={columns}*/ />
                            <CustomMaterialTable data={this.state.completedProducts} columns={columns} title={'الاودرات المكتملة'} /*onRowUpdatePromise={this.handleEdit} data={data} columns={columns}*/ />
                        </React.Fragment>
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SellingOrders);