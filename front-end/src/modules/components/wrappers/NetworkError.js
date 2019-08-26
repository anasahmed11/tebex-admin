import React from 'react';
import { withStyles, Grid, Typography, Button, } from '@material-ui/core';
import { Helmet } from "react-helmet";

import styles from '../../../assets/jss/views/NotFound';
import globalVariables from '../../../global-variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NetworkError(props) {

    const { classes, error } = props;
    return (
        error?
        <Grid container justify='center' alignItems="center" className={classes.root}>
            <Helmet>
                <title>{globalVariables.PAGE_TITLE_SERVER_ERROR[globalVariables.LANG]}</title>
            </Helmet>
            <Grid item md={8} xs={10}>
                <Grid container justify='center' alignItems="center">
                    <Grid item md={8} sm={10} xs={12} className={classes.paddingTop}>
                       <FontAwesomeIcon style={{width:'30%', height:'100%', color:'navy'}} icon="tools" />
                    </Grid>
                    <Grid item md={12} xs={12} className={classes.paddingTop}>
                        <Typography style={{color:'#5D1F62'}} component="h2" variant="h3" gutterBottom >{globalVariables.NETWORK_ERROR_SERVER[globalVariables.LANG]}</Typography>
                        <Typography style={{color:'#5D1F62'}} component="h2" variant="h6" gutterBottom>{globalVariables.NETWORK_ERROR_SERVER_MESSAGE[globalVariables.LANG]}</Typography>
                        <Button color="primary" variant="contained" onClick={()=>window.location.reload()}>{globalVariables.LABEL_REFRESH[globalVariables.LANG]}</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>:props.children
    );
}

export default withStyles(styles)(NetworkError);