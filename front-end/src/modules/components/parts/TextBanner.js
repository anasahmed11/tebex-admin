import React from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import styles from '../../../assets/jss/components/parts/TextBanner';

const StoreBanner = props => {
    
    const {classes} = props;
    return <Grid container className={classes.root} >
                <Grid lg={12} sm={12} className={classes.banner}>
                    <Typography className={classes.text} variant="h1" align="center">
                        {props.text}
                    </Typography>
                </Grid> 
            </Grid>
}

export default withStyles(styles)(StoreBanner);