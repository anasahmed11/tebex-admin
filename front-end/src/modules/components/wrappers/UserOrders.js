import React from 'react';
import { Link, } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, createMuiTheme, CssBaseline, } from '@material-ui/core';
import 'typeface-roboto';

import Order from '../parts/Order';
import { orderAPI } from '../../../api/api'
import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from '../../../assets/jss/components/wrappers/UserOrders';
import Pagination from '../parts/Pagination';

import { ThemeProvider } from '@material-ui/styles';
// border: 1px solid white;
// border-radius: 2px;
// text-align: center;
// color: white !important;
// width: 100%;
// background-color: #247BA0;



const theme = createMuiTheme({
    /*palette: {
      primary: { main: '#FFF' },
      secondary: { main: '#FFF' },
      action: {
        disabledBackground: '#05f',
        
      }
    },
    status: {
      danger: 'orange',
    },*/
});

class UserOrders extends React.Component {
    state = {
        orders: [],
        isLoading: true,
        current_page: 0,
        total: 0,
    }

    pendingPromises = [];
    componentWillUnmount = () =>
        this.pendingPromises.map(p => p.cancel());
    appendPendingPromise = promise =>
        this.pendingPromises = [...this.pendingPromises, promise];
    removePendingPromise = promise =>
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);


    getOrders = (page) => {
        
        const wrappedPromise = cancelablePromise(orderAPI.get('?page=' + page));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                this.setState({
                    orders: res.data.data,
                    total: res.data.total,
                    current_page: page,
                    isLoading: false,
                    limit: res.data.per_page,
                })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            })

    }
    componentDidMount() {
        this.getOrders(1)
    }


    handleClick = (current_page) => 
        this.getOrders(current_page)
    

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
                        <React.Fragment>
                            {this.state.orders.map(order => <Order key={uuid()} order={order} />)}
                            <ThemeProvider  theme={theme}>
                                <CssBaseline />
                                <Pagination
                                    limit={this.state.limit}
                                    current_page={this.state.current_page}
                                    total={this.state.total}
                                    handleClick={this.handleClick}
                                />
                            </ThemeProvider >
                        </React.Fragment> :
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