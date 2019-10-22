import React from 'react';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, Snackbar, } from '@material-ui/core';
import 'typeface-roboto';

import StatsCard from '../parts/StatsCard';

import styles from '../../../assets/jss/components/wrappers/SellerDashboard';
import SellerPaymentRequest from './SellerPaymentRequest';
import { withdrawAPI, sellerAPI } from '../../../api/api';
import cancelablePromise from '../../../Providers/CancelablePromise';
import CustomMaterialTabl from '../parts/CustomMaterialTable';
import MySnackbar from '../parts/MySnackbar';

const columns = [
    { title: 'Status', field: 'status', filtering: false },
    { title: 'Cash', field: 'cash', filtering: false },
    { title: 'Method', field: 'payments.method', type: "numeric", filtering: false },
    { title: 'Account', field: 'payments.account', type: "numeric", filtering: false },
    { title: 'Created at', field: 'created_at', filtering: false },

]

class SellerDashboard extends React.Component {

    state = {
        pendingEarn: null,
        approvedEarn: null,
        confirmedEarn: null,

        withdraws: []
    }

    pendingPromises = [];

    componentWillUnmount = () => this.pendingPromises.map(p => p.cancel());

    appendPendingPromise = promise => this.pendingPromises = [...this.pendingPromises, promise];

    removePendingPromise = promise => this.pendingPromises = this.pendingPromises.filter(p => p !== promise);

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
    getEarnings = () => {
        const wrappedPromise = cancelablePromise(sellerAPI.get('/earning'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise
            .promise
            .then(res => {
                this.setState({ confirmedEarn: res.data.balance })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {

                }
            });

    }
    componentDidMount() {
        this.getWithdraws()
        this.getEarnings()
    }
    handleConfirmPayment = (payment) => {
        let data = {
            payment_account_id: payment.id,
            type: 'store'
        }
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
                    <StatsCard
                        title={globalVariables.DASHBOARD_PENDING_EARN[globalVariables.LANG]}
                        highlight={this.state.pendingEarn}
                        desc={globalVariables.DASHBOARD_PENDING_EARN_DESC[globalVariables.LANG]}
                        currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]}
                    />
                    <StatsCard
                        title={globalVariables.DASHBOARD_APPROVED_EARN[globalVariables.LANG]}
                        highlight={this.state.approvedEarn}
                        desc={globalVariables.DASHBOARD_APPROVED_EARN_DESC[globalVariables.LANG]}
                        currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]}
                    />
                    <StatsCard
                        title={globalVariables.DASHBOARD_CONFIRMED_EARN[globalVariables.LANG]}
                        highlight={this.state.confirmedEarn}
                        desc={globalVariables.DASHBOARD_CONFIRMED_EARN_DESC[globalVariables.LANG]}
                        currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]}
                    />
                </Grid>
                <Grid container item xs={12} className={classes.paymentCards}>
                    <SellerPaymentRequest handleConfirmPayment={this.handleConfirmPayment} />
                </Grid>
                <Grid container item xs={12} className={classes.paymentCards}>
                    <CustomMaterialTabl title={'withdraw request'} filtering data={this.state.withdraws} columns={columns} />
                </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(SellerDashboard);