import React from 'react';
import { connect } from 'react-redux';
import globalVariables from '../../../global-variables';

import { Typography, withStyles, Grid, Button,  } from '@material-ui/core';
import 'typeface-roboto';

import AddressSummary from '../parts/AddressSummary';
import CheckoutSummary from '../parts/CheckoutSummary';
import ShopCartItem from '../parts/ShopCartItem';

import styles from '../../../assets/jss/components/wrappers/Payment';

class Payment extends React.Component{
    
    state = {   
    }   

    render(){
        
        const {classes, shipment, totalPrice, address} = this.props;
        
        return(
            <React.Fragment>
                <Grid item xs={12} >
                    <Typography display="inline" gutterBottom component='h2' variant='h5'>{globalVariables.LABEL_PAYMENT[globalVariables.LANG]}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justify="center" className={classes.root} spacing={1}>
                    
                        <Grid item md={7} xs={11}>
                            {this.props.items.map((item =>
                                <ShopCartItem key={item.id} item={item} previewOnly />
                            ))}
                        </Grid>

                        <Grid item md={5} xs={11}>
                            <CheckoutSummary totalPrice={totalPrice} shipment={shipment}/>   
                            <AddressSummary address={address} />
                        </Grid>
                        
                        <Button color='primary' variant='contained' style={{margin:'10px'}} onClick={this.props.handleNextButton}>
                            {globalVariables.LABEL_BUY[globalVariables.LANG]}
                        </Button>     
                        <Button color='secondary' variant='contained' disabled={this.props.stepIndex===0} style={{margin:'10px'}} onClick={this.props.handleBackButton}>
                            {globalVariables.LABEL_PREVIOUS[globalVariables.LANG]}
                        </Button>   
                        
                    </Grid>    
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        numItems: state.cart.numItems,
        items: state.cart.items,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Payment));