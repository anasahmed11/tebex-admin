import React from 'react';
import { Typography, withStyles, Grid, Divider,   } from '@material-ui/core';

import globalVariables from '../../../global-variables';

import styles from '../../../assets/jss/components/parts/CheckoutSummary';

const CheckoutSummary = props => {

    const { classes, totalPrice, shipment } = props
    const shipmentPrice = shipment !== undefined? shipment.fees:-1

    return <React.Fragment>

        <Grid container justify="center" alignItems="center" className={classes.checkoutSummary}>    
    
            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography gutterBottom component='h1' variant='h5' className={classes.textHeader}> {globalVariables.CART_ORDER_SUMMARY[globalVariables.LANG]} </Typography>
                    </Grid>
                    
                </Grid>
            </Grid>

            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography component='h1' variant='h6' className={classes.textHead}>{globalVariables.CART_ORDER_ITEMS_PRICE[globalVariables.LANG]}</Typography>
                    </Grid>
                    <Grid item xs={4}> 
                        <Typography component='h1' variant='h6' className={classes.textSection}>{totalPrice} {globalVariables.LABEL_CURRENCY[globalVariables.LANG]}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography component='h1' variant='h6' className={classes.textHead}>{globalVariables.LABEL_SHIPPING[globalVariables.LANG]}</Typography>
                    </Grid>
                    <Grid item xs={4}> 
                        <Typography gutterBottom component='h1' variant='h6' className={classes.textSection}> {(shipmentPrice===-1?globalVariables.CART_ORDER_SHIPPING_STATUS[globalVariables.LANG]:`${shipmentPrice} ${globalVariables.LABEL_CURRENCY[globalVariables.LANG]}`)}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={12}> 
                        <Typography gutterBottom component='h1' variant='h6' className={classes.textSection}><Divider variant="middle" /></Typography>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography gutterBottom component='h1' variant='h6' className={classes.textHead}>{globalVariables.CART_ORDER_TOTAL_PRICE[globalVariables.LANG]}</Typography>
                    </Grid>
                    <Grid item xs={4}> 
                        <Typography gutterBottom component='h1' variant='h6' className={classes.textSection}>{totalPrice+(shipmentPrice===-1?0:shipmentPrice)} {globalVariables.LABEL_CURRENCY[globalVariables.LANG]}</Typography>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
        
    </React.Fragment>
}

export default withStyles(styles)(CheckoutSummary);