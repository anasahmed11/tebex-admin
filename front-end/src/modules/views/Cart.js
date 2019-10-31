import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Helmet } from "react-helmet";
import globalVariables from '../../global-variables';

import { Typography, withStyles, Grid, Button, Snackbar } from '@material-ui/core';
import 'typeface-roboto';

import { deleteFromCart, cartFinish } from '../../store/actions/shoppingCart';

import CartEmpty from '../components/parts/CartEmpty'
import MySnackbar from '../components/parts/MySnackbar'
import CheckoutSummary from '../components/parts/CheckoutSummary';
import ShopCartItem from '../components/parts/ShopCartItem';

import styles from '../../assets/jss/views/Cart';

class Cart extends React.Component{
    state = {
        items: []
    }
   
    handleDelete = id => this.props.handleDeleteFromCart(id, this.props.items);

    handleCheckout = () => {
    }

    render(){
        const {classes, isPopup, isLoading, serverMessage, messageType, handlePopupClose} = this.props;
        const totalPrice = this.props.items.reduce((total, item) => total + item.sale_price * item.cart.quantity, 0);
        const totalItems = this.props.numItems;
        
        return(
            <Grid container justify="center" className={classes.root}>
                <Helmet>
                    <title>{globalVariables.PAGE_TITLE_CART[globalVariables.LANG]}</title>
                    
                </Helmet>
                <Snackbar
                    style={{bottom:'50px'}}   
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
                            <Typography display="inline" gutterBottom component='h2' variant='h5'>{globalVariables.CART_TITLE[globalVariables.LANG]}</Typography>
                            <Typography display="inline" component='h2' variant='caption' style={{color:'gray'}}> ({totalItems} {globalVariables.LABEL_PRODUCT[globalVariables.LANG]})</Typography>
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
                                        totalItems === 0?
                                        <CartEmpty />:
                                        this.props.items.map((item=>
                                            <ShopCartItem key={item.id} item={item} handleDelete={this.handleDelete}/>
                                        ))
                                    }
                                </Grid>

                                <Grid item md={4} xs={10} style={{padding:'0px 4px'}}>
                                    <CheckoutSummary totalPrice={totalPrice}/>    
                                    <Grid container justify="center" alignItems="center" className={classes.checkoutButton}>
                                        <Button color='primary' variant='contained' disabled={totalItems===0} fullWidth component={Link} to="/checkout">{globalVariables.CART_CHECKOUT[globalVariables.LANG]}</Button>                                    
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
        handleDeleteFromCart: (id, shopping_cart) => dispatch(deleteFromCart(id, shopping_cart)),
        handlePopupClose: () => dispatch(cartFinish()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart)));