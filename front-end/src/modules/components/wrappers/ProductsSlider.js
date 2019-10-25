import React, { Component } from "react";
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import SlickSlider from '../parts/SlickSlider';
import ProductCard from '../parts/ProductCardX';
import LinedTitle from '../parts/TwoLinesSectionTitle';

import { categoryAPI } from '../../../api/api';
 
import styles from '../../../assets/jss/components/wrappers/ProductSlider';

const noImage = "https://thefittingsource.com/wp-content/uploads/2017/12/temp-inventory-landing.jpg"

class ProductSlider extends Component {

  state = {  
    products: []
  }

  componentDidMount = () => {
    categoryAPI.get('1/products')
    .then(res => {
        const { products } = this.state;
        for (let item of res.data.data)
          products.push(item);
    
        this.setState({
          products: products,
        })
    })
    .catch(res => {
        console.log(res)
    })   
  }

  render() {
    
    const { classes } = this.props

    const products = this.state.products.map(product =>
        <div key={uuid()}>
          <ProductCard 
            id={product.id}
            title={globalVariables.LANG === 'ar'? product.name : product.name_en} 
            price={product.sale_price? product.sale_price : product.price}
            oldPrice={product.sale_price? product.price : false}
            currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]}
            img={product.images.length? product.images[0] : noImage}
            product={product}
            slider
          />
        </div>
      );

    return (
        <Grid container className={classes.root}>
          <LinedTitle style={{color:"#2E4676"}}>
            {globalVariables.LABEL_HOME_PRODUCTS_SLIDER[globalVariables.LANG]}
          </LinedTitle>
          <SlickSlider variableWidth arrowColor="#2E4676" className={classes.sliderLayout}>
            {products}
          </SlickSlider>
        </Grid>
    );
  }
}

ProductSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductSlider);

