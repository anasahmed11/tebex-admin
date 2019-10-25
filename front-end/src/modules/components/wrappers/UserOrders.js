import React from 'react';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, CssBaseline, } from '@material-ui/core';
import 'typeface-roboto';

import { orderAPI } from '../../../api/api'
import cancelablePromise from '../../../Providers/CancelablePromise';

import Order from '../parts/Order';
import Pagination from '../parts/Pagination';
import MyClipLoader from '../parts/MyClipLoader';
import MyOrdersEmpty from '../parts/MyOrdersEmpty';

import styles from '../../../assets/jss/components/wrappers/UserOrders';

class UserOrders extends React.Component {
    state = {
        orders: [],
        isLoading: true,
        current_page: 1,
        total: 0,

        intialLoading: true,
    }

    pendingPromises = [];
    componentWillUnmount = () =>
        this.pendingPromises.map(p => p.cancel());
    appendPendingPromise = promise =>
        this.pendingPromises = [...this.pendingPromises, promise];
    removePendingPromise = promise =>
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);

    getOrders = (page) => {
        this.setState({ isLoading: true });

        const wrappedPromise = cancelablePromise(orderAPI.get('?page=' + page));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                this.setState({
                    orders: res.data.data,
                    total: Math.ceil(res.data.total / res.data.per_page),
                    current_page: page,
                    isLoading: false,
                    limit: res.data.per_page,
                    intialLoading: false,
                })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            });
    }

    componentDidMount() {
        this.getOrders(1)
    }

    handleClick = (current_page) =>
        this.getOrders(current_page.selected + 1)


    render() {
        const { classes } = this.props;
        const { isLoading, intialLoading } = this.state

        return (
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>{globalVariables.LABEL_MY_ORDERS[globalVariables.LANG]}</Typography>
                </Grid>

                <MyClipLoader isLoading={isLoading} />

                {this.state.orders.length ?
                    <React.Fragment>
                        {this.state.orders.map(order => <Order key={uuid()} order={order} />)}
                        <CssBaseline />
                        <Pagination
                            limit={this.state.limit}
                            current_page={this.state.current_page - 1}
                            total={this.state.total}
                            handleClick={this.handleClick}
                        />
                    </React.Fragment>
                    : intialLoading ? null : <MyOrdersEmpty />
                }
            </Grid>
        );
    }
}

export default withStyles(styles)(UserOrders);