import React from 'react';
import { Typography, withStyles, Grid, Button, Snackbar } from '@material-ui/core';
import {connect} from 'react-redux';
import 'typeface-roboto';
import {Link, withRouter} from 'react-router-dom';

import { ClipLoader } from 'react-spinners';

import CartEmpty from '../components/parts/CartEmpty'

import MySnackbar from '../components/parts/MySnackbar'
import CheckoutSummary from '../components/parts/CheckoutSummary';
import ShopCartItem from '../components/parts/ShopCartItem';

import { deleteFromCart, cartFinish } from '../../store/actions/shoppingCart';

import Cookies from 'universal-cookie';

const cookies = new Cookies();



const styles = theme => ({
    root: {
        padding: `${theme.spacing.unit * 4}px 0px`,
        minHeight:'500px',   
        position:'relative',
        backgroundColor:'rgb(0,0,0,0.01)',
        
    },
    root2:{
        padding: `${theme.spacing.unit * 2}px 0px`,
        position:'relative',
        backgroundColor:'white',
    },
    root3:{
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px`,
        minHeight:'200px',
        boxShadow:' 0px 0px 30px 10px rgba(0, 0, 0, 0.06)'
    },
    checkoutButton:{
        padding: `${theme.spacing.unit * 2}px 0px`
    },
    sweetLoading:{
        textAlign:'center'
    }
    
});


class Cart extends React.Component{
    state = {
        items:[]

    }
   

    handelDelete = (id) => {
       this.props.handleDeleteFromCart(id,this.props.items)
    }
    handleCheckout = () => {
        
    }

    render(){
        const {classes, isPopup, isLoading, serverMessage, messageType, handlePopupClose} = this.props;
        const totalPrice = this.props.items.reduce((total,item)=>total+item.sale_price*item.cart.quantity,0)
        const totalItems = this.props.numItems
        return(
            <Grid container justify="center" className={classes.root}>

                
                
                <Snackbar
                    style={{direction:'ltr', bottom:'50px'}}   
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={isPopup && serverMessage !== ""}
                    autoHideDuration={6000}
                    onClose={handlePopupClose}
                >
                    <MySnackbar 
                        className={classes.margin}
                        onClose={handlePopupClose}
                        variant={messageType}
                        message={serverMessage}
                    />
                
                </Snackbar>

                
                <Grid item md={10} sm={10} xs={11}>
                    <Grid container justify="center">
                        <Grid item xs={12} className={classes.root2} style={{backgroundColor:'transparent'}}>
                            <Typography inline gutterBottom component='h2' variant='h5'>عربة التسوق</Typography>
                            <Typography inline component='h2' variant='caption' style={{color:'gray'}}> ({totalItems} منتج)</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.root2}>


                            {isLoading?
                                <Grid container justify="center" >
                                        <ClipLoader
                                            sizeUnit={"px"}
                                            size={75}
                                            color={'#123abc'}
                                            loading={isLoading}
                                        />
                                </Grid>:null
                            }
                            {isLoading?null:
                            <Grid container justify="center" className={classes.root3}>

                                <Grid item md={8} xs={10} style={{padding:'0px 4px'}}>
                                    {
                                        totalItems===0?<CartEmpty />:
                                        this.props.items.map((item=>
                                            <ShopCartItem key={item.id} item={item} handelDelete={this.handelDelete}/>
                                            ))
                                    }
                                                                      

                                </Grid>

                                <Grid item md={4} xs={10} style={{padding:'0px 4px'}}>
                                    <CheckoutSummary totalPrice={totalPrice}/>    
                                    <Grid container justify="center" alignItems="center" className={classes.checkoutButton}>
                                        <Button color='primary' variant='contained' disabled={totalItems===0} fullWidth component={Link} to="/checkout">متابعة عملية الشراء</Button>                                    
                                    </Grid>
                                </Grid>
                            </Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
        
        );
    }



}
const mapStateToProps = state => {
    return {
        numItems: state.cart.numItems,
        items: state.cart.items,
        isPopup: state.cart.popup,
        isLoading:state.cart.isLoading,
        serverMessage:state.cart.message,
        messageType: state.cart.messageType
    }
}

const mapDispatchToProps = dispatch => {
    return{
        handleDeleteFromCart: (id,shopping_cart) => dispatch(deleteFromCart(id,shopping_cart)),
        handlePopupClose: () => dispatch(cartFinish()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart)));