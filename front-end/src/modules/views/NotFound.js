import React from 'react';
import { withStyles, Grid, Typography, Button, } from '@material-ui/core';
import { Helmet } from "react-helmet";

import styles from '../../assets/jss/views/NotFound';
import globalVariables from '../../global-variables';

function NotFound(props) {

    const { classes } = props;
    return (
        <Grid container justify='center' alignItems="center" className={classes.root}>
            <Helmet>
                <title>{globalVariables.PAGE_TITLE_NOT_FOUND[globalVariables.LANG]}</title>
            </Helmet>
            <Grid item md={8} xs={10}>
                <Grid container justify='center' alignItems="center">
                    <Grid item md={4} xs={4} className={classes.paddingTop}>
                        <img alt="Broken Cart" src="https://cdn1.iconfinder.com/data/icons/shopping-line-6/23/cart-broken-2-512.png" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item md={4} xs={12} className={classes.paddingTop}>
                        <Typography component="h1" variant="h1" style={{ fontWeight: '1000' }} gutterBottom>404</Typography>
                        <Typography component="h2" variant="h6" >لم يتم العثور على الصفحة</Typography>
                        <Typography component="h2" variant="h6" gutterBottom>تواصل مع ادارة الموقع اذا كنت تعتقد ان هناك خطأ</Typography>
                    </Grid>
                </Grid>
                <Button className={classes.button} variant="outlined" color="primary" onClick={() => { props.history.push('/home') }}>
                    الرجوع للصفحة الرئيسية
                </Button>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(NotFound);