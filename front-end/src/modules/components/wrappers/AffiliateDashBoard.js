import React from 'react';
import ChartistGraph from "react-chartist";
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, } from '@material-ui/core';
import 'typeface-roboto';

import {
    emailsSubscriptionChart,
    completedTasksChart
} from "../../../charts";

import StatsCard from '../parts/StatsCard';
import ChartCard from '../parts/ChartCard';

import { userAPI, orderAPI } from '../../../api/api';
import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from '../../../assets/jss/components/wrappers/AffiliateDashboard';

class UserDashBoard extends React.Component {
    state = {
        isLoading: true,
        numTeamMembers: null,
        numClicks: null,
        affTotalOrders: null,
        affDeliveredOrders: null
    }

    pendingPromises = [];

    componentWillUnmount = () => this.pendingPromises.map(p => p.cancel());
    
    appendPendingPromise = promise => this.pendingPromises = [...this.pendingPromises, promise];
    
    removePendingPromise = promise => this.pendingPromises = this.pendingPromises.filter(p => p !== promise);

    getTeamCount = () => {
        const wrappedPromise = cancelablePromise(userAPI.get('/team'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => { this.setState({ numTeamMembers: res.data.length,}) })
            .then(() => this.removePendingPromise(wrappedPromise))        
    }

    getAffiliateClicks = () => {
        const wrappedPromise = cancelablePromise(userAPI.get('affiliate/click/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => { this.setState({ numClicks: res.data.clicks,}) })
            .then(() => this.removePendingPromise(wrappedPromise))
    }

    getAffiliateOrders = () => {
        const wrappedPromise = cancelablePromise(orderAPI.get('affiliate/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => { this.setState({ affTotalOrders: res.data.totalOrders, affDeliveredOrders: res.data.totalDeiveredOrders}) })
            .then(() => this.removePendingPromise(wrappedPromise))
    }
    
    componentDidMount() {
        this.getTeamCount();
        this.getAffiliateClicks();
        this.getAffiliateOrders();
        this.setState({ isLoading: false });
    }

    render() {
        const { classes, } = this.props;

        return (
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>{globalVariables.LABEL_DASHBOARD[globalVariables.LANG]}</Typography>
                </Grid>
                <Grid container item xs={12} className={classes.statsCardsRoot}>
                    <StatsCard title={globalVariables.DASHBOARD_CLICKS[globalVariables.LANG]} highlight={this.state.numClicks} desc={globalVariables.DASHBOARD_CLICKS_DESC[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_TOTAL_ORDERS[globalVariables.LANG]} highlight={this.state.affTotalOrders} desc={globalVariables.DASHBOARD_TOTAL_ORDERS_DESC[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_CONFIRMED_ORDERS[globalVariables.LANG]} highlight={this.state.affDeliveredOrders} desc={globalVariables.DASHBOARD_CONFIRMED_ORDERS_DESC[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_ORDERS_EARNING[globalVariables.LANG]} highlight={300} desc={globalVariables.DASHBOARD_ORDERS_EARNING_DESC[globalVariables.LANG]} currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]} />
                </Grid>
                <Grid container item xs={12} className={classes.statsCardsRoot}>
                    <StatsCard title={globalVariables.DASHBOARD_TEAM_MEMBERS[globalVariables.LANG]} highlight={this.state.numTeamMembers} desc={globalVariables.DASHBOARD_TEAM_MEMBERS_DESC[globalVariables.LANG]} link="/affiliate/tree" />
                    <StatsCard title={globalVariables.DASHBOARD_TEAM_EARNING[globalVariables.LANG]} highlight={390} desc={globalVariables.DASHBOARD_TEAM_EARNING_DESC[globalVariables.LANG]} currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_REFERRAL_EARNING[globalVariables.LANG]} highlight={300} desc={globalVariables.DASHBOARD_REFERRAL_EARNING_DESC[globalVariables.LANG]} currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_CONFIRMED_EARNING[globalVariables.LANG]} highlight={155} desc={globalVariables.DASHBOARD_CONFIRMED_EARNING_DESC[globalVariables.LANG]} />
                </Grid>
                {/*<Grid container item xs={12} className={classes.statsCardsRoot}>
                    <ChartCard title={'ارباح'} highlight={
                        <ChartistGraph
                            className="ct-chart"
                            data={completedTasksChart.data}
                            type="Line"
                            options={completedTasksChart.options}
                            listener={completedTasksChart.animation}
                        />
                    } desc={'خربانة'} />
                    <ChartCard title={'ارباح'} highlight={
                        <ChartistGraph
                            className={classes.shit}
                            data={emailsSubscriptionChart.data}
                            type="Bar"
                            options={emailsSubscriptionChart.options}
                            responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                            listener={emailsSubscriptionChart.animation}
                        />
                    } desc={'خربانة'} />
                </Grid>*/}
            </Grid>
        );
    }
}

export default withStyles(styles)(UserDashBoard);