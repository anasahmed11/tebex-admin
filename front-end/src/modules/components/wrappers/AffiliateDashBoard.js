import React from 'react';

import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, Snackbar, } from '@material-ui/core';
import 'typeface-roboto';


import StatsCard from '../parts/StatsCard';


import { userAPI, orderAPI, affiliateAPI, withdrawAPI } from '../../../api/api';
import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from '../../../assets/jss/components/wrappers/AffiliateDashboard';
import SellerPaymentRequest from './SellerPaymentRequest';
import CustomMaterialTable from '../parts/CustomMaterialTable';
import MySnackbar from '../parts/MySnackbar';

const columns = [
    { title: 'Status', field: 'status', filtering: false },
    { title: 'Cash', field: 'cash', filtering: false },
    { title: 'Method', field: 'payments.method', type: "numeric", filtering: false },
    { title: 'Account', field: 'payments.account', type: "numeric", filtering: false },
    { title: 'Created at', field: 'created_at', filtering: false },

]

class UserDashBoard extends React.Component {
    state = {
        isLoading: true,
        numTeamMembers: null,
        numClicks: null,
        affTotalOrders: null,
        affDeliveredOrders: null,
        level: null,

        withdraws: [],

        isPopup: false,
    }

    pendingPromises = [];

    componentWillUnmount = () => this.pendingPromises.map(p => p.cancel());

    appendPendingPromise = promise => this.pendingPromises = [...this.pendingPromises, promise];

    removePendingPromise = promise => this.pendingPromises = this.pendingPromises.filter(p => p !== promise);

    getTeamCount = () => {
        const wrappedPromise = cancelablePromise(userAPI.get('/team'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => { this.setState({ numTeamMembers: res.data.length, }) })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ numTeamMembers: "error!", })
                }
            })
    }

    getAffiliateClicks = () => {
        const wrappedPromise = cancelablePromise(userAPI.get('affiliate/click/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => { this.setState({ numClicks: res.data.clicks, }) })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ numClicks: "error!", })
                }
            })
    }

    getAffiliateOrders = () => {
        const wrappedPromise = cancelablePromise(orderAPI.get('affiliate/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => { this.setState({ affTotalOrders: res.data.totalOrders, affDeliveredOrders: res.data.totalDeiveredOrders }) })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ affTotalOrders: "error!", affDeliveredOrders: "error!" })
                }
            })
    }
    getAffiliateEarning = () => {

        const wrappedPromise = cancelablePromise(affiliateAPI.get('earning/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                this.setState({
                    activeBalance: res.data.active_balance,
                    inactiveBalance: res.data.inactive_balance,
                    suspendedBalance: res.data.suspended_balance
                })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({
                        activeBalance: "error!" ,
                        inactiveBalance: "error!" ,
                        suspendedBalance: "error!" ,
                    })
                }
            })
    }
    getAffiliateLevel = () => {
        const wrappedPromise = cancelablePromise(affiliateAPI.get('level/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                this.setState({
                    level: res.data.plan_id
                })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({
                        level: "error!" ,
                    })
                }
            })
    }
    componentDidMount() {
        this.getTeamCount();
        this.getAffiliateClicks();
        this.getAffiliateOrders();
        this.getAffiliateEarning();
        this.getAffiliateLevel();
        this.getWithdraws()
        this.setState({ isLoading: false });
        
    }

    getWithdraws = () => {
        const wrappedPromise = cancelablePromise(withdrawAPI.get('/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise
            .promise
            .then(res => {
                res.data.map(item => {
                   
                    item.created_at = new Date(item.created_at).toDateString("yyyy-MM-dd");
                    item.payments.account = JSON.parse(item.payments.account)
                    const account = Object.entries(item.payments.account).map(
                                ([key, value]) => <div>
                                                    <Typography display='inline' gutterBottom>{key}: </Typography>
                                                    <Typography display='inline' gutterBottom>{value}</Typography>
                                                </div>)
                    item.payments.account = <div>{account}</div>
                })
                console.log(res.data)
                this.setState({ withdraws: res.data })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    
                }
            });
    }
    
    handleConfirmPayment = (payment) => {
        let data = {
            payment_account_id: payment.id,
            type: 'affiliate'
        }
        console.log(data)
        const wrappedPromise = cancelablePromise(withdrawAPI.post('/', data));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise
            .promise
            .then(res => { 
                this.getWithdraws()
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({isPopup: true})
                }
            });
    }

    handlePopupClose = () => this.setState({ isPopup: false });

    render() {
        const { classes, } = this.props;
        
        return (
            <Grid container item justify='center' xs={11}>
                <Snackbar
                    style={{ bottom: '50px' }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.isPopup}
                    autoHideDuration={6000}
                    onClose={this.handlePopupClose}
                >
                    <MySnackbar
                        className={classes.margin}
                        onClose={this.handlePopupClose}
                        variant={globalVariables.TYPE_INFO}
                        message={"رصيدك الحالي صفر"}
                    />
                </Snackbar>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>{globalVariables.LABEL_DASHBOARD[globalVariables.LANG]}</Typography>
                </Grid>
                <Grid container item xs={12} className={classes.statsCardsRoot}>
                    <StatsCard title={globalVariables.DASHBOARD_CLICKS[globalVariables.LANG]} highlight={this.state.numClicks} desc={globalVariables.DASHBOARD_CLICKS_DESC[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_TOTAL_ORDERS[globalVariables.LANG]} highlight={this.state.affTotalOrders} desc={globalVariables.DASHBOARD_TOTAL_ORDERS_DESC[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_CONFIRMED_ORDERS[globalVariables.LANG]} highlight={this.state.affDeliveredOrders} desc={globalVariables.DASHBOARD_CONFIRMED_ORDERS_DESC[globalVariables.LANG]} />

                    <StatsCard title={globalVariables.DASHBOARD_ORDERS_EARNING[globalVariables.LANG]} highlight={this.state.inactiveBalance} desc={globalVariables.DASHBOARD_ORDERS_EARNING_DESC[globalVariables.LANG]} currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_TEAM_MEMBERS[globalVariables.LANG]} highlight={this.state.numTeamMembers} desc={globalVariables.DASHBOARD_TEAM_MEMBERS_DESC[globalVariables.LANG]} link="/affiliate/tree" />
                    <StatsCard title={globalVariables.DASHBOARD_TEAM_EARNING[globalVariables.LANG]} highlight={'-'} desc={globalVariables.DASHBOARD_TEAM_EARNING_DESC[globalVariables.LANG]} currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]} />
                    
                    <StatsCard title={globalVariables.DASHBOARD_REFERRAL_EARNING[globalVariables.LANG]} highlight={this.state.suspendedBalance} desc={globalVariables.DASHBOARD_REFERRAL_EARNING_DESC[globalVariables.LANG]} currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_CONFIRMED_EARNING[globalVariables.LANG]} highlight={this.state.activeBalance} desc={globalVariables.DASHBOARD_CONFIRMED_EARNING_DESC[globalVariables.LANG]} currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]}/>
                    <StatsCard title={globalVariables.DASHBOARD_MY_LEVEL[globalVariables.LANG]} highlight={this.state.level} desc={globalVariables.DASHBOARD_MY_LEVEL_DESC[globalVariables.LANG]} />
                </Grid>
                <Grid container item xs={12} className={classes.paymentCards}>
                    <SellerPaymentRequest handleConfirmPayment={this.handleConfirmPayment}/>
                </Grid>

                <Grid container item xs={12} className={classes.paymentCards}>
                    <CustomMaterialTable title={'withdraw request'} filtering data={this.state.withdraws} columns={columns} />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(UserDashBoard);