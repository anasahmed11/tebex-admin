import React from 'react';
import { Link, } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, } from '@material-ui/core';
import 'typeface-roboto';

import Order from '../parts/Order';
import { orderAPI } from '../../../api/api'
import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from '../../../assets/jss/components/wrappers/UserOrders';

class UserOrders extends React.Component {
    state = {
        orders: [],
        isLoading: true
    }

    pendingPromises = [];

    componentWillUnmount = () =>
        this.pendingPromises.map(p => p.cancel());

    appendPendingPromise = promise =>
        this.pendingPromises = [...this.pendingPromises, promise];

    removePendingPromise = promise =>
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);


    componentDidMount() {
        const wrappedPromise = cancelablePromise(orderAPI.get('/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => { this.setState({ orders: res.data, isLoading: false }) })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            })
    }
    render() {
        const { classes } = this.props;
        const { isLoading } = this.state
        return (
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>{globalVariables.LABEL_MY_ORDERS[globalVariables.LANG]}</Typography>
                </Grid>
                {isLoading ?
                    <Grid container alignItems="center" justify="center" >
                        <ClipLoader
                            sizeUnit={"px"}
                            size={75}
                            color={'#123abc'}
                            loading={isLoading}
                        />
                    </Grid> : this.state.orders.length ?
                        this.state.orders.map(order =>
                            <Order key={uuid()} order={order} />
                        ) :
                        <Grid container alignItems="center" justify="center" style={{ textAlign: 'center', position: 'relative', overflow: "hidden" }}>
                            <Grid item xs={12}>
                                <Typography variant="h4" gutterBottom>{globalVariables.MY_ORDERS_EMPTY[globalVariables.LANG]}</Typography>
                                <Typography variant="h6">
                                    {globalVariables.MY_ORDERS_VISIT_STORE[globalVariables.LANG]} <Link to='/shop'> {globalVariables.LABEL_HERE[globalVariables.LANG]}</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                }
            </Grid>

        );
    }
}


export default withStyles(styles)(UserOrders);