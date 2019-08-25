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
        for (let item of res.data.data){
          // First image for this product
          products.push({
            id: item.id,
            img: item.images[0],
            link: item.slug,
            title: {ar: item.name, en: item.name_en},
            price: item.price,
            salePrice: item.sale_price,
          });
        }
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

    const products = this.state.products.map(item =>
        <div key={uuid()}>
          <ProductCard 
            id={item.id}
            title={item.title[globalVariables.LANG]} 
            price={item.salePrice? item.salePrice : item.price}
            oldPrice={item.salePrice? item.price : false}
            currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]}
            img={item.img? item.img : noImage}
            slider
          />
        </div>
      );

    return (
        <Grid container className={classes.root}>
          <LinedTitle color="#5D1F62">
            {globalVariables.LABEL_HOME_PRODUCTS_SLIDER[globalVariables.LANG]}
          </LinedTitle>
          <SlickSlider variableWidth arrowColor="#5D1F62" className={classes.sliderLayout}>
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

