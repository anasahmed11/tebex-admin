import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import globalVariables, { getProductURL } from '../../../global-variables';

import { 
    Typography,
    withStyles,
    Grid, 
    Divider, 
    IconButton, 
    TextField,
    Button
 } from '@material-ui/core';

import { DeleteForever } from '@material-ui/icons';
import { addToCart } from '../../../store/actions/shoppingCart';

import ReturnForm from './ReturnForm';

import styles from '../../../assets/jss/components/parts/ShopCartItem';
import { baseURL, returnAPI } from '../../../api/api';

class ShopCartItem extends Component{

    state = {
        returnFormOpen: false,
        returned: !this.props.item.product.returnable,
    }
 
    handleQuantityChange = event => {
        console.log()
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
        console.log(content);
        returnAPI.post('/', content)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }

    render(){
        const { classes, item, previewOnly, handleDelete } = this.props;
        // console.log( item);
        let product = previewOnly? item.product : item;
        const price = previewOnly? item.price : item.sale_price;
        const quantity = previewOnly? item.quantity : item.cart.quantity;
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
                                    :"https://ss7.vzw.com/is/image/VerizonWireless/iphone7-front-matblk?$device-lg$" } // product.images}
                            alt="product"/>
                    </Grid>    
                    <Grid item sm={6} xs={12}>
                        <Grid item>
                            <Typography gutterBottom variant='h6' className={classes.textSection}>
                                <Link to={`product/${getProductURL(product)}`} className={classes.cleanLink}><b>{product.name}</b></Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant='h6' className={classes.textSection}>
                                {globalVariables.LABEL_SELLER[globalVariables.LANG]}: <Link to={`shop/${product.store.id}`} className={classes.cleanLink}>{product.store.name}</Link>
                            </Typography>
                        </Grid>
                        {previewOnly?
                            this.state.returned?
                            <Grid item>
                                <Typography className={classes.returnInfo}>
                                    {globalVariables.FORM_RETURN_PROCESSING[globalVariables.LANG]}
                                </Typography>
                            </Grid>
                            : <Grid item>
                                <Button className={classes.returnButton} primary variant="outlined" onClick={this.toggleReturnButton} >
                                    {globalVariables.FORM_RETURN_LABEL_BUTTON[globalVariables.LANG]}
                                </Button>
                                <ReturnForm
                                    open={this.state.returnFormOpen}
                                    title={globalVariables.FORM_RETURN_LABEL_TITLE[globalVariables.LANG]}
                                    onClose={this.toggleReturnButton}
                                    formAction={this.handleReturnRequest}
                                    name={product.name}
                                    quantity={quantity}
                                    image={baseURL + product.images[0].slice(1)}                                    
                                />
                            </Grid> : null}
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
                                            onChange={(event) => this.props.handleQuantityChange(item,event.target.value)}
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