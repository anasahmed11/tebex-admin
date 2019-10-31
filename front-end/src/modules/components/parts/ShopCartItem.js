import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import globalVariables, { noImage, getProductURL } from '../../../global-variables';

import {  Typography, withStyles, Grid, Divider, IconButton, TextField, Button } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

import { baseURL, returnAPI } from '../../../api/api';
import { addToCart } from '../../../store/actions/shoppingCart';

import ReturnForm from './ReturnForm';

import styles from '../../../assets/jss/components/parts/ShopCartItem';

class ShopCartItem extends Component{

    state = {
        returnFormOpen: false,
        returnRequested: false,
    }

    toggleReturnButton = () =>
        this.setState({ returnFormOpen: !this.state.returnFormOpen });

    handleReturnRequest = (reason, note) => {
        this.setState({ returnFormOpen: false, returned: true });
        const content = {
            order_id: this.props.orderId,
            product_id: this.props.item.product.id,
            reason: reason,
            note: note,
        }
        returnAPI.post('/', content)
        .then(res => {
            // console.log(res);
            this.setState({
                returnRequested: true,
            });
        })
        .catch(err => console.log(err));
    }

    render(){
        const { classes, item, fromOrder, previewOnly, handleDelete } = this.props;

        let product = fromOrder? item.product : item;
        const price = fromOrder? item.price : item.sale_price;
        const quantity = fromOrder? item.quantity : item.cart.quantity;
        const options = previewOnly? 
            null : [...Array(item.quantity + 1).keys()].slice(1).map((n,idx) => <option key={idx} value={n}> {n} </option>);
        
        return(
            <Grid item xs={12} className={classes.root}>
                
                <Grid container justify="center" className={classes.upperSection}>
                    <Grid item sm={3} xs={12} component={Link} to={`/product/${getProductURL(product)}`} className={classes.imageRoot}>
                        <img 
                            className={classes.image} 
                            src={product.images.length? 
                                    baseURL + product.images[0].slice(1)
                                    : noImage }
                            alt="product"/>
                    </Grid>    
                    <Grid item sm={6} xs={12}>
                        <Grid item>
                            <Typography gutterBottom variant='h6' className={classes.textSection}>
                                <Link to={`product/${getProductURL(product)}`} className={classes.cleanLink}>
                                    <b style={{textTransform: 'uppercase'}}>{globalVariables.LANG === 'ar'? product.name : product.name_en}</b>
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant='h6' className={classes.textSection}>
                                {globalVariables.LABEL_SELLER[globalVariables.LANG]}: <Link to={`shop/${product.store.id}`} className={classes.cleanLink}>
                                {globalVariables.LANG === 'ar'? product.store.name : product.store.name_en}
                                </Link>
                            </Typography>
                        </Grid>

                        {fromOrder?
                            this.props.item.return_application || this.state.returnRequested?
                            <Grid item>
                                <Typography className={classes.returnInfo}>
                                    {this.props.item.return_application? 
                                        this.props.item.return_application.status_message : 'Return form sent'}
                                </Typography>
                            </Grid>
                            : this.props.item.returnable?
                            <Grid item>
                                <Button className={classes.returnButton} primary variant="outlined" onClick={this.toggleReturnButton} >
                                    {globalVariables.FORM_RETURN_LABEL_BUTTON[globalVariables.LANG]}
                                </Button>
                                <ReturnForm
                                    open={this.state.returnFormOpen}
                                    title={globalVariables.FORM_RETURN_LABEL_TITLE[globalVariables.LANG]}
                                    onClose={this.toggleReturnButton}
                                    formAction={this.handleReturnRequest}
                                    name={product.name}
                                    name_en={product.name_en}
                                    quantity={quantity}
                                    image={baseURL + product.images[0].slice(1)}                                    
                                />
                            </Grid>
                            : null
                        : null }
                    </Grid>

                    <Grid item sm={3} xs={12}>
                            <Typography gutterBottom variant='h6' className={classes.textSection}>{globalVariables.LABEL_PRODUCT_PRICE[globalVariables.LANG]}: {price} {globalVariables.LABEL_CURRENCY[globalVariables.LANG]}</Typography>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                            <Typography gutterBottom variant='h6' className={classes.textSection}>
                                {globalVariables.LABEL_QUANTITY[globalVariables.LANG]}: 
                                </Typography>
                                {previewOnly? 
                                    <Typography gutterBottom variant='h6' className={classes.textSection}>
                                        &nbsp;{quantity}
                                    </Typography> :
                                    <form>
                                        <TextField
                                            select
                                            className={classes.menu}
                                            value={quantity}
                                            onChange={(event) => this.props.handleQuantityChange(item, event.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            >
                                            {options}
                                        </TextField>
                                    </form>
                                }
                            </div>
                            <Typography gutterBottom variant='h6' className={classes.textSection}>{globalVariables.CART_ORDER_TOTAL_PRICE[globalVariables.LANG]}: {quantity * price} {globalVariables.LABEL_CURRENCY[globalVariables.LANG]}</Typography>
                    </Grid>  
                </Grid>

                {previewOnly? null:
                <React.Fragment>
                <Grid item xs={12}>
                    <Divider variant="middle" style={{marginBottom:'5px'}} />
                </Grid>
                
                <Grid container justify="flex-end" >
                    <React.Fragment>
                    <Grid item xs={1} style={{textAlign:'center'}}>
                        <Typography gutterBottom variant='h6' className={classes.textSection}>|</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography gutterBottom variant='h6' className={classes.textSection}>
                            <IconButton aria-label="Cart" style={{padding:'0px',marginTop:'-3px', color:'darkred'}} onClick={() => handleDelete(product.id)}>
                                <DeleteForever  />
                            </IconButton>
                        </Typography>
                    </Grid>
                    </React.Fragment>
                </Grid>      
                </React.Fragment>
                }
            </Grid>

        );
    }
}



const mapDispatchToProps = dispatch => {
    return{
        handleQuantityChange: (product, quantity) => dispatch(addToCart(product, quantity,true,true)),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(ShopCartItem)))