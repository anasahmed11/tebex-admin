import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography,  } from '@material-ui/core';

import ChartistGraph from "react-chartist";
import {
        emailsSubscriptionChart,
        completedTasksChart
} from "../../../charts";

import StatsCard from '../parts/StatsCard';
import ChartCard from '../parts/ChartCard';
import globalVariables from '../../../global-variables';


const styles = theme => ({
    root: {
      backgroundColor: 'white ',
      padding: `${theme.spacing(4)}px 0px`,
    },
    textHead:{
        fontWeight:'500'
    },
    statsCardsRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    shit: {
        // backgroundColor: 'green',
        // padding: theme.spacing(2),
        '& .ct-label': { 
            color: 'blue',
        },
        '& line.ct-bar': {
            stroke: 'gray',
        }
    }
});

class UserDashBoard extends React.Component{
    state ={
    }

    render(){
        const {classes, } = this.props;
        
        return(
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>{globalVariables.LABEL_DASHBOARD[globalVariables.LANG]}</Typography>
                </Grid>
                <Grid container item xs={12} className={classes.statsCardsRoot}>
                    <StatsCard title={globalVariables.DASHBOARD_CLICKS[globalVariables.LANG]} highlight={300} desc={globalVariables.DASHBOARD_CLICKS_DESC[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_TOTAL_ORDERS[globalVariables.LANG]} highlight={59} desc={globalVariables.DASHBOARD_TOTAL_ORDERS_DESC[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_CONFIRMED_ORDERS[globalVariables.LANG]} highlight={51} desc={globalVariables.DASHBOARD_CONFIRMED_ORDERS_DESC[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_ORDERS_EARNING[globalVariables.LANG]} highlight={300} desc={globalVariables.DASHBOARD_ORDERS_EARNING_DESC[globalVariables.LANG]} currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]} />
                </Grid>
                <Grid container item xs={12} className={classes.statsCardsRoot}>
                    <StatsCard title={globalVariables.DASHBOARD_TEAM_MEMBERS[globalVariables.LANG]} highlight={21} desc={globalVariables.DASHBOARD_TEAM_MEMBERS_DESC[globalVariables.LANG]} link="/tree" />
                    <StatsCard title={globalVariables.DASHBOARD_TEAM_EARNING[globalVariables.LANG]} highlight={390} desc={globalVariables.DASHBOARD_TEAM_EARNING_DESC[globalVariables.LANG]} currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_REFERRAL_EARNING[globalVariables.LANG]} highlight={300} desc={globalVariables.DASHBOARD_REFERRAL_EARNING_DESC[globalVariables.LANG]} currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]} />
                    <StatsCard title={globalVariables.DASHBOARD_CONFIRMED_EARNING[globalVariables.LANG]} highlight={155} desc={globalVariables.DASHBOARD_CONFIRMED_EARNING_DESC[globalVariables.LANG]} />
                </Grid>
                <Grid container item xs={12} className={classes.statsCardsRoot}>
                    <ChartCard title={'ارباح'} 
                        highlight={
                            <ChartistGraph
                                className="ct-chart"
                                data={completedTasksChart.data}
                                type="Line"
                                options={completedTasksChart.options}
                                listener={completedTasksChart.animation}
                            />
                        }
                        style={{flexBasis:' 100%'}} 
                        desc={'خربانة'} />
                    <ChartCard title={'ارباح'} highlight={
                        <ChartistGraph
                        className={classes.shit}
                        data={emailsSubscriptionChart.data}
                        type="Bar"
                        options={emailsSubscriptionChart.options}
                        responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                        listener={emailsSubscriptionChart.animation}
                      />
                    } 
                    style={{flexBasis:' 100%'}} 
                    desc={'خربانة'} />
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(UserDashBoard);