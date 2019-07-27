import React from 'react';
import { connect } from 'react-redux';

import { withStyles, Grid, Button, Hidden, Divider, Snackbar, Paper, } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';

import uuid from 'uuid'
import globalVariables from '../../../global-variables';
const styles = theme => ({});


function PackageCard(props){
    console.log(props.color)
    return(
        <Grid component={Paper} container justify='center' alignItems='flex-start' style={{height:props.big?'300px':'200px'}}>
            <Grid item xs={12} style={{backgroundColor:props.color,padding:'10px 0px',fontSize:'24px',fontWeight:'bold',borderBottom:'1px solid gray'}}>
                {props.title}
            </Grid>
            <Grid container justify='center' xs={12} alignItems='center' style={{padding:'10px 0px',height:props.big?'200px':'100px'}}>
                {props.features.map(text=><Grid key={uuid()}>{text}</Grid>)} 
            </Grid>
            <Grid item xs={12} style={{padding:'10px 0px'}}>
               {globalVariables.LABEL_PRICE[globalVariables.LANG]}: {props.price} 
            </Grid>
        </Grid>
    )

}

export default withStyles(styles)(PackageCard);