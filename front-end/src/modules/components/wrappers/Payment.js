import React from 'react';
import { Typography, withStyles, Grid, Button,  } from '@material-ui/core';
import CheckoutSummary from '../parts/CheckoutSummary';
import AddressSummary from '../parts/AddressSummary';
import 'typeface-roboto';

const styles = theme => ({

    root:{
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px`,
    },

       
});




class Payment extends React.Component{
    state = {
        
        
    }

   
   

    render(){
        const {classes, shipment, totalPrice, address} = this.props;
        return(
            <React.Fragment>
                <Grid item xs={12} >
                    <Typography inline gutterBottom component='h2' variant='h5'>الدفع</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justify="center" className={classes.root} spacing={8}>

                       
                        <Grid item md={7} xs={11}>
                           <AddressSummary address={address} />
                        </Grid>



                        <Grid item md={5} xs={11}>
                            <CheckoutSummary totalPrice={totalPrice} shipment={shipment}/>   
                        </Grid>
                                
                            
                        
                        <Button color='primary' variant='contained' style={{margin:'10px'}} onClick={this.props.handleNextButton}>
                            شراء
                        </Button>     
                        <Button color='secondary' variant='contained' disabled={this.props.stepIndex===0} style={{margin:'10px'}} onClick={this.props.handleBackButton}>
                            السابق
                        </Button>   
                        
                    </Grid>
                    
                </Grid>
            </React.Fragment>
        );
    }



}


export default withStyles(styles)(Payment);