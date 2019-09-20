import React from 'react';
import globalVariables from '../../../global-variables';

import { Typography, withStyles, Grid, } from '@material-ui/core';

import styles from '../../../assets/jss/components/parts/AddressSummary';

const CheckoutSummary = props => {
    const { classes, address } = props
    return (
        <React.Fragment>
            <Grid container justify="center" className={classes.checkoutSummary}>

                <Grid item xs={11}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography gutterBottom component='h1' variant='h5' className={classes.textHeader}>{globalVariables.LABEL_ADDRESS[globalVariables.LANG]}</Typography>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={11}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography component='h1' variant='h6' className={classes.textHead}>{globalVariables.LABEL_NAME[globalVariables.LANG]}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component='h1' variant='h6' className={classes.textSection}>{address.first_name + ' ' + address.last_name}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={11}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography component='h1' variant='h6' className={classes.textHead}>{globalVariables.LABEL_ADDRESS[[globalVariables.LANG]]}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography 
                                gutterBottom 
                                component='h1' 
                                variant='h6' 
                                className={classes.textSection}
                            >
                                {`Egypt, ${address.governorate.governorate_name}, ${address.city}, ${address.address} `}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={11}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography component='h1' variant='h6' className={classes.textHead}>{globalVariables.LABEL_PHONE[globalVariables.LANG]}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography gutterBottom component='h1' variant='h6' className={classes.textSection}>{address.phone}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}


export default withStyles(styles)(CheckoutSummary)