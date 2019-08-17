import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import {
    withStyles,
    Grid,
    Typography,
    Paper,
} from '@material-ui/core';
import 'typeface-roboto';

import ShopCartItem from "./ShopCartItem";
import Stepper from "./Stepper";

import styles from '../../../assets/jss/components/parts/Order';

const Order = props => {
    
    const { order, classes } = props;
    return (
        <Grid component={Paper} item container className={classes.root} justify='center' xs={12}>

            <Grid item className={classes.orderInfoSection} xs={12}>
                <Typography gutterBottom className={classes.orderInfoItem}>{globalVariables.TRACK_OREDER_NUMBER[globalVariables.LANG]}: #{order.id}</Typography>
                <Typography gutterBottom className={classes.orderInfoItem}>{globalVariables.TRACK_OREDER_DATE[globalVariables.LANG]}: {order.created_at}</Typography>
                <Typography gutterBottom className={classes.orderInfoItem}>{globalVariables.TRACK_OREDER_RECIPIENT[[globalVariables.LANG]]}: {order.address.first_name + ' ' + order.address.last_name}</Typography>
                <Typography gutterBottom className={classes.orderInfoItem}>{globalVariables.TRACK_OREDER_STATUS[[globalVariables.LANG]]}: {order.status}</Typography>
                <Typography gutterBottom className={classes.orderInfoItem}>
                    {globalVariables.TRACK_OREDER_TOTAL_PRICE[globalVariables.LANG]}: {order.products.reduce((total, product) => total + product.price * product.quantity, 0) + order.shipping_fees}
                </Typography>
                <Typography gutterBottom className={classes.orderInfoItem}>
                    <Link to={`orders/${order.id}`}>{globalVariables.TRACK_OREDER_DETAIL[globalVariables.LANG]}</Link>
                </Typography>
            </Grid>

            <Grid container item xs={11}>
                {order.products.map((item =>
                    <ShopCartItem key={uuid()} item={item} previewOnly />
                ))}
            </Grid>
            <Stepper steps={['انا', 'في', 'الساحة', 'واقف', 'لوحدي']} stepIndex={order.state} />
        </Grid>

    );
}

export default withStyles(styles)(Order)
