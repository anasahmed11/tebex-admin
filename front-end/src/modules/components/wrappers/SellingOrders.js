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
import globalVariables, { getProductURL } from '../../../global-variables';
import SelectMenu from '../parts/SelectMenu';

const orderStatusData = globalVariables.LANG === 'ar' ?
    [
        { value: 'all', label: 'الكل' },
        { value: 'active', label: 'نشط' },
        { value: 'shipped', label: 'في الشحن' },
        { value: 'delivered', label: 'تم التوصيل' },
        { value: 'canceled', label: 'الغي' },
        { value: 'returned', label: 'استرجع' },
    ]
    :
    [
        { value: 'all', label: 'all' },
        { value: 'active', label: 'active' },
        { value: 'shipped', label: 'shipped' },
        { value: 'delivered', label: 'delivered' },
        { value: 'canceled', label: 'canceled' },
        { value: 'returned', label: 'returned' },
    ];

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

        orderStatus: 'all',
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
                    item.product.name = <Link to={`/product/${getProductURL(item.product)}`}>{item.product.name}</Link>
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
                    item.product.name = <Link to={`/product/${getProductURL(item.product)}`}>{item.product.name}</Link>
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
                    item.product.name = <Link to={`/product/${getProductURL(item.product)}`}>{item.product.name}</Link>
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
    handleFilterChange = prop => event =>
        this.setState({ [prop]: event.target.value });

    render() {

        const { classes } = this.props;
        const { isLoading, isPopup, messageType, serverMessage } = this.state;
        let lng = globalVariables.LANG;
        const notPendingProds = this.state.orderStatus === 'all' ?
            [...this.state.processingProducts, ...this.state.completedProducts] :
            [...this.state.processingProducts, ...this.state.completedProducts].filter(prod => prod.order.status === this.state.orderStatus)
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

                            <CustomMaterialTable
                                data={this.state.pendingProducts}
                                columns={[...columns, { title: '', field: 'action' }]}
                                title={globalVariables.LABEL_SELLING_ORDERS_PENDING[lng]}
                            />

                            <div className={classes.optionMenusSection}>
                                <SelectMenu
                                    name="sort"
                                    onChange={this.handleFilterChange('orderStatus')}
                                    value={this.state.orderStatus}
                                    values={orderStatusData}
                                    sideLabel={"حالة الاوردر"}
                                    version={2}
                                />
                            </div>
                            
                            <CustomMaterialTable
                                data={notPendingProds}
                                columns={columns} t
                                itle={globalVariables.LABEL_SELLING_ORDERS_NOT_PENDING[lng]}
                            />

                        </React.Fragment>
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SellingOrders);
