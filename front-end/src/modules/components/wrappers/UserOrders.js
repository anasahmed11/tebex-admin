import React from 'react';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, CssBaseline, Paper, InputBase, } from '@material-ui/core';
import 'typeface-roboto';

import { orderAPI } from '../../../api/api'
import cancelablePromise from '../../../Providers/CancelablePromise';

import Order from '../parts/Order';
import Pagination from '../parts/Pagination';
import MyClipLoader from '../parts/MyClipLoader';
import MyOrdersEmpty from '../parts/MyOrdersEmpty';

import styles from '../../../assets/jss/components/wrappers/UserOrders';
import { Menu, Search } from '@material-ui/icons';


function get_bigrams(string) {
    var s = string.toLowerCase()
    var v = s.split('');
    for (var i = 0; i < v.length; i++) { v[i] = s.slice(i, i + 2); }
    return v;
}

function string_similarity(str1, str2) {
    if (str1.length > 0 && str2.length > 0) {
        var pairs1 = get_bigrams(str1);
        var pairs2 = get_bigrams(str2);
        var union = pairs1.length + pairs2.length;
        var hits = 0;
        for (var x = 0; x < pairs1.length; x++) {
            for (var y = 0; y < pairs2.length; y++) {
                if (pairs1[x] == pairs2[y]) hits++;
            }
        }
        if (hits > 0) return ((2.0 * hits) / union);
    }
    return 0.0
}


class UserOrders extends React.Component {
    state = {
        orders: [],
        isLoading: true,
        current_page: 1,
        total: 0,

        intialLoading: true,
        searchText: ''
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

    handleAddressSearch = event => {
        this.setState({ searchText: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { isLoading, intialLoading } = this.state
        console.log(this.state.orders, this.state.searchText)
        return (
            <Grid container item justify='center' xs={11} spacing={2}>
                <Grid item >
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>{globalVariables.LABEL_MY_ORDERS[globalVariables.LANG]}</Typography>
                </Grid>
                <Grid item xs={6} >
                    <Paper className={classes.searchRoot}>
                        <InputBase
                            className={classes.input}
                            placeholder="البحث عن عنوان"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={this.handleAddressSearch}
                            value={this.state.searchText}
                        />
                        <div className={classes.iconButton} aria-label="search">
                            <Search />
                        </div>

                    </Paper>
                </Grid>
                <MyClipLoader isLoading={isLoading} />

                {this.state.orders.length ?
                    <React.Fragment>
                        {this.state.orders.filter(order => order.id == this.state.searchText || this.state.searchText === '').map(order => <Order key={uuid()} order={order} />)}
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