import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography,  } from '@material-ui/core';

import ChartistGraph from "react-chartist";
import {
        dailySalesChart,
        emailsSubscriptionChart,
        completedTasksChart
} from "../../../charts";

import StatsCard from '../parts/StatsCard';
import ChartCard from '../parts/ChartCard';


const styles = theme => ({
    root: {
      backgroundColor: 'white ',
      padding: `${theme.spacing.unit * 4}px 0px`,
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
        // padding: theme.spacing.unit * 2,
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
            <Grid container justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='display1' className={classes.textHead}>الإحصائيات</Typography>
                </Grid>
                <Grid container xs={12} className={classes.statsCardsRoot}>
                    <StatsCard title={'الكليكات'} highlight={300} desc={'خربانة'} />
                    <StatsCard title={'اجمالي الطلبات'} highlight={59} desc={'خلال الشهر'} />
                    <StatsCard title={'الطلبات المكتملة '} highlight={51} desc={'خلال الشهر'} />
                    <StatsCard title={'ارباح الطلبات'} highlight={300} desc={'خلال الشهر'} currency=' جنيه' />
                </Grid>
                <Grid container xs={12} className={classes.statsCardsRoot}>
                    <StatsCard title={'فريقي'} highlight={21} desc={'اجمالي العدد'} link="/tree" />
                    <StatsCard title={'ارباح الفريق'} highlight={390} desc={'خلال الشهر'} currency=' جنيه' />
                    <StatsCard title={'ارباح المحول'} highlight={300} desc={'خربانة'} currency=' جنيه' />
                    <StatsCard title={'الرصيد المتاح'} highlight={155} desc={'قابل للسحب'} />
                </Grid>
                <Grid container xs={12} className={classes.statsCardsRoot}>
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
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(UserDashBoard);