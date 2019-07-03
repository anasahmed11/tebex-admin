import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { 
    Typography,
    withStyles,
    Grid, 
    Divider, 
    IconButton, 
    TextField
 } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
 
import { addToCart } from '../../../store/actions/shoppingCart';

import globalVariables from '../../../global-variables';

const styles = theme => ({
    root: {
        border:'1px solid rgba(0,0,0,0.1)',
        margin: `0px 0px ${theme.spacing.unit * 2}px 0px`,
        padding: theme.spacing.unit * 1,
    },
    upperSection:{
        minHeight:'100px',
        padding:`${theme.spacing.unit * 2}px 0px`
    },
    imageRoot:{
        textAlign:'center',
    },
    image:{
        width: '50%',
        maxHeight:'200px',
    },
    textSection:{
        fontWeight:'500',
        fontSize:'13px',
        color:'rgb(100,100,100)',
    },
   menu: {
       width: '60px',
       margin: '0px 4px 10px 0px'
   },
   cleanLink: {
       textDecoration: 'none',
       color: 'navy',
   }
});

class ShopCartItem extends Component{
    state = {

    }
 
    handleQuantityChange = event => {
        console.log()
    }

    render(){
        const { classes, item, previewOnly, handelDelete } = this.props;
        
        let product = previewOnly? item.product : item;
        const price = previewOnly? item.price : item.sale_price;
        const quantity = previewOnly? item.quantity : item.cart.quantity;
        const options = previewOnly? 
            null : [...Array(item.quantity + 1).keys()].slice(1).map(n => <option value={n}> {n} </option>);
        
        return(
            <Grid item xs={12} className={classes.root}>
                
                <Grid container justify="center" className={classes.upperSection}>
                    <Grid item sm={3} xs={12} component={Link} to={`/product/${product.id}`} className={classes.imageRoot}>
                        <img 
                            className={classes.image} 
                            src={"https://ss7.vzw.com/is/image/VerizonWireless/iphone7-front-matblk?$device-lg$" } // product.images}
                            alt="product"/>
                    </Grid>    
                    <Grid item sm={6} xs={12}>
                        <Grid item>
                            <Typography gutterBottom variant='h6' className={classes.textSection}>
                                <Link to={`product/${product.id}`} className={classes.cleanLink}><b>{product.name}</b></Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant='h6' className={classes.textSection}>
                                {globalVariables.LABEL_SELLER[globalVariables.LANG]}: <Link to={`shop/${product.store.id}`} className={classes.cleanLink}>{product.store.name}</Link>
                            </Typography>
                        </Grid>
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
                        <Typography gutterBottom variant='h6' className={classes.textSection} style={{textAlign:'right'}}>
                            <IconButton aria-label="Cart" style={{padding:'0px',marginTop:'-3px', color:'darkred'}} onClick={() => handelDelete(product.id)}>
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