import React, { useState } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { MoonLoader } from "react-spinners";
import LazyLoad from 'react-lazy-load';
import globalVariables from '../../../global-variables';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { addToCart } from '../../../store/actions/shoppingCart';

import styles from '../../../assets/jss/components/parts/ProductCardX';

const ProductCard = (props) => {
  
    const { classes, slider, product } = props;
    const [loading, setLoading] = useState(true);

    const Loading = () => 
    <Grid container justify="center" className={classes.loading} style={{display: loading? 'block':'none'}} >
        <MoonLoader css={`margin: auto`} color={'#594589'} loading={props.loading} />
    </Grid>
    console.log('cardz', product)
    return (
        <div className={slider? classes.make3DspaceSlider : classes.make3Dspace}>
            <div className={slider? classes.productCardSlider : classes.productCard}>
                {product.quantity? null : <div className={classes.outOfStock}></div>}
                <div className={slider? classes.productFrontSlider : classes.productFront}>
                    <Loading loading={loading} />
                    <LazyLoad offsetTop={200} onContentVisible={() => setLoading(false)}>
                    <div className={classes.imageContainer}>
                        <img className={slider? classes.productImageSlider : classes.productImage} src={globalVariables.SERVER_BASE_URL + props.img} alt={props.title} />
                    </div>
                    </LazyLoad>
                    <div className={classes.shadow}></div>
                    <div className={classes.imageOverlay}></div>
                    <Link className={classes.link} to={`/product/${product.slug}/${product.id}-${product.sku}`}>
                        <Typography variant='h6' style={{textTransform: 'uppercase'}} className={slider? classes.viewDetailsSlider : classes.viewDetails}>
                            {product.quantity? globalVariables.LABEL_SHOP_VIEW_DETAILS[globalVariables.LANG]
                            : globalVariables.PRODUCT_OUT_OF_STOCK[globalVariables.LANG]}
                        </Typography>
                    </Link>
                    {props.oldPrice?
                        <Typography variant='h6' className={slider? classes.discountSlider : classes.discount}>
                            {Math.round((props.oldPrice - props.price) * 100 / props.oldPrice)}% {globalVariables.LABEL_PRODUCT_DISCOUNT[globalVariables.LANG]}
                        </Typography>
                    :null}
                    <div className={slider? classes.statsContainerSlider : classes.statsContainer}>
                        <Typography variant='h6' className={slider? classes.productBrandSlider : classes.productBrand}>
                            {globalVariables.LANG === 'ar'? product.store.name : product.store.name_en}    
                        </Typography>    
                        <Typography variant='h6' className={slider? classes.productNameSlider : classes.productName}>{props.title}</Typography>    
                        <Typography variant='h6' className={slider? classes.productOldPriceSlider : classes.productOldPrice}>
                            {props.oldPrice? props.oldPrice + ' ' + props.currency : ''}
                        </Typography>
                        <Typography variant='h6' className={slider? classes.productPriceSlider : classes.productPrice}>{props.price} {props.currency}</Typography>
                        {product.quantity?
                        <Typography variant='h6' className={slider? classes.addToCartSlider : classes.addToCart} onClick={() => props.addProductToCart(props.product)}>
                            {globalVariables.LABEL_SHOP_ADD_TO_CART[globalVariables.LANG]}
                        </Typography>
                        :<Typography variant='h6' className={slider? classes.addToCartSlider : classes.addToCart}>
                            {globalVariables.PRODUCT_OUT_OF_STOCK[globalVariables.LANG]}
                        </Typography>}
                    </div>
                </div>
            </div>	
        </div>
  );
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return{
      addProductToCart: (product) => dispatch(addToCart(product, 1, true)),
     
  }
}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(ProductCard)));


/*<div className={classes.make3Dspace}>
    <div className={classes.productCard}>
        <div className={classes.productFront}
            style={{
                background: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt.png")',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
            }}
        >
            <div className={classes.shadow}></div>
            <div className={classes.imageOverlay}></div>
            <div className={classes.viewDetails}>View details</div>
            <div className={classes.statsContainer}>
                <span className={classes.productPrice}>$39</span>
                <span className={classes.productName}>Adidas Originals</span>    
                <p>Men's running shirt</p>
                <div className={classes.productOptions}>
                    <strong>SIZES</strong>
                    <span>XS, S, M, L, XL, XXL</span>
                    <strong>COLORS</strong>
                    <div className={classes.colors}>
                        <div className={classes.cBlue}><span></span></div>
                        <div className={classes.cRed}><span></span></div>
                        <div className={classes.cWhite}><span></span></div>
                        <div className={classes.cGreen}><span></span></div>
                    </div>
                </div>                       
            </div>
        </div>
    </div>	
</div>*/