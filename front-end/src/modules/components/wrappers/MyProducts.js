import React from 'react';
import { ClipLoader } from 'react-spinners';

import { withStyles, Grid, Typography, IconButton, } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'typeface-roboto';

import CustomMaterialTabl from '../parts/CustomMaterialTable';

import cancelablePromise from '../../../Providers/CancelablePromise';
import { productsAPI } from '../../../api/api';

import styles from '../../../assets/jss/components/wrappers/MyProducts';

const columns = [
    { title: 'Name', field: 'name', filtering: false },
    { title: 'SKU', field: 'sku', filtering: false },
    { title: 'Price', field: 'price', type: "numeric", filtering: false },
    { title: 'Sale Price', field: 'sale_price', type: "numeric", filtering: false },
    { title: 'Qunatity', field: 'quantity', type: "numeric", filtering: false },
    { title: 'Commission', field: 'comm_percent', type: "numeric", filtering: false },
    { title: 'Status', field: 'status', lookup: { 'approved': 'approved', 'pending': 'pending', 'refused': 'refused' }, },
    { title: 'Status Message', field: 'status_message', filtering: false },
    { title: 'Created at', field: 'created_at', filtering: false },
    { title: 'Edit', field: 'edit', filtering: false },
    { title: 'Active', field: 'activeIcon', filtering: false },
]

class MyProdcuts extends React.Component {
    state = {
        products: [],
        isLoading: true,
    }

    pendingPromises = [];

    componentWillUnmount = () => this.pendingPromises.map(p => p.cancel());

    appendPendingPromise = promise => this.pendingPromises = [...this.pendingPromises, promise];

    removePendingPromise = promise => this.pendingPromises = this.pendingPromises.filter(p => p !== promise);

    handleEditAction = id => this.props.history.push(`/seller/edit-product/${id}`);
    handleActiveAction = id => {

        const wrappedPromise = cancelablePromise(productsAPI.post(`seller/active-toggle/${id}`));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                const products = [...this.state.products];
                const idx = products.findIndex(prod => prod.id === id);
                products[idx].active = !this.state.products[idx].active;
                products[idx].activeIcon = products[idx].active ?
                <IconButton onClick={() => this.handleActiveAction(id)}><FontAwesomeIcon color="green" icon="toggle-on" /></IconButton> :
                <IconButton onClick={() => this.handleActiveAction(id)}><FontAwesomeIcon icon="toggle-off" /></IconButton>
                
                this.setState({ products: products });
            })
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount = () => {
        // data.map(item=>item.action = <IconButton onClick={()=>this.handleEditAction(item.id)}><FontAwesomeIcon icon="edit" /></IconButton> )
        const wrappedPromise = cancelablePromise(productsAPI.get('/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                res.data.map(item => {
                    item.created_at = new Date(item.created_at).toDateString("yyyy-MM-dd");
                    item.edit = <IconButton onClick={() => this.handleEditAction(item.id)}><FontAwesomeIcon icon="edit" /></IconButton>
                    item.activeIcon = item.active ?
                        <IconButton onClick={() => this.handleActiveAction(item.id)}><FontAwesomeIcon color="green" icon="toggle-on" /></IconButton> :
                        <IconButton onClick={() => this.handleActiveAction(item.id)}><FontAwesomeIcon icon="toggle-off" /></IconButton>
                })
                this.setState({ products: res.data, isLoading: false })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            })
        //this.setState({isLoading:false})
    }

    // handleEdit = (newData, oldData) => {
    //     console.log(oldData)
    // }

    render() {
        const { classes, } = this.props;
        const { isLoading } = this.state;
        return (
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>منتجاتي</Typography>
                </Grid>
                <Grid container item xs={12}>
                    {isLoading ?
                        <Grid container alignItems="center" justify="center" >
                            <ClipLoader
                                sizeUnit={"px"}
                                size={75}
                                color={'#123abc'}
                                loading={isLoading}
                            />
                        </Grid> :
                        <CustomMaterialTabl title={'منتجاتي'} filtering data={this.state.products} columns={columns} />
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(MyProdcuts);