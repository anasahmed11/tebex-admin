import React from 'react';
import uuid from 'uuid'
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Paper, Typography, Button, } from '@material-ui/core';


const styles = theme => ({
    root: {
        transition: 'transform 500ms',
        border: '1px solid transperent',
        zIndex: '100',
        '&:hover': {
            transform: 'scale(1.2)',
            zIndex: '500'
        }
    },
    header: {
        width: '100%',
        borderRadius: '5px 5px 0px 0px',
        minHeight: '62px',
        borderBottom: '3px solid transperent',
    },
    title: {
        fontFamily: 'Open Sans',
        fontWeight: '800',
        fontSize: ' 29px',
        textTransform: 'uppercase',
        color: 'white',
        textAlign: 'center',
        paddingTop: '10px',
    },
    content: {
        backgroundColor: '#2b2937',
        borderRadius: '0px 0px 5px 5px',
        fontFamily: 'Open Sans',
        fontStyle: 'condensed',
        fontSize: '90px',
        color: 'white',
        textAlign: 'center',

    },
    price: {
        borderBottom: '1px solid #494a5a',
        padding: '39px 0px',
        fontSize: '45px',
    },
    subprice: {
        fontSize: '14px',
        color: '#575757',
        padding: '0px',
    },
    features: {
        borderBottom: '1px solid #494a5a',
        padding: '20px 0px',
        fontSize: '16px',
    }

});

function PackageCard(props) {
    const { classes } = props;
    const style = { transform: 'scale(1.1)', border: '1px solid gray', }
    return (
        <Grid className={classes.root} component={Paper} onClick={() => props.handleCardSelected(props.id)} style={props.selected?style:{}} container justify='center'  >
            <Grid 
                className={classes.header} 
                item 
                xs={12} 
                style={{ 
                    background: `linear-gradient(90deg, rgba(2,0,36,1) -150%, ${props.color} 100%)`,
                    borderBottom: `3px solid ${props.border}`
                     }}>
                <p className={classes.title}> {props.title} </p>
            </Grid>
            <Grid className={classes.content} container justify='center'>
                <Grid item xs={12}>
                    <Typography display='block' className={classes.price}  >
                        {props.price}
                        <Typography display='block' className={classes.subprice}  >
                            Pound
                        </Typography>
                    </Typography>

                </Grid>
                <Grid item xs={12}>
                    <Typography display='block' className={classes.features}  >
                        15 Email Accounts
                    </Typography>
                    <Typography display='block' className={classes.features}  >
                        100GB Space
                    </Typography>
                    <Typography display='block' className={classes.features}  >
                        1 Domain Name
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{ fontSize: '50px' }}>
                    <Button variant="contained">SELECT</Button>

                </Grid>

                {/* {  <Grid container item justify='center' xs={12} alignItems='center' style={{padding:'10px 0px',height:props.big?'200px':'100px', fon}}>
                    {props.features.map(text=><Grid key={uuid()}>{text}</Grid>)} 
                </Grid>} */}

            </Grid>
        </Grid>
    )

}

export default withStyles(styles)(PackageCard);