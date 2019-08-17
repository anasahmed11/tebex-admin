import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import SlickSlider from '../parts/SlickSlider';
import Product from '../parts/ProductCard';
import LinedTitle from '../parts/TwoLinesSectionTitle';

import { categoryAPI } from '../../../api/api';
 
const styles = theme => ({
  root: {
    backgroundColor: '#1E3953',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  
  sliderLayout: {
    width: '80%',
    margin: 'auto'
  }
});

const noImage = "https://thefittingsource.com/wp-content/uploads/2017/12/temp-inventory-landing.jpg"

class ProductSlider extends Component {

  state = {  
    products: [
      
    ]
  }


  componentDidMount(){
    categoryAPI.get('1/products')
    .then(res => {
        const { products } = this.state;
        for (let item of res.data.data){
          // First image for this product
          products.push({
            id: item.id,
            img: item.images[0],
            link: item.slug,
            title: item.name,
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
          <Product 
            product={item}
            id={item.id}
            title={item.title} 
            price={item.salePrice? item.salePrice : item.price}
            oldPrice={item.salePrice? item.price : false}
            currency={'جنيه'}
            img={item.img? item.img : noImage}
            slider
          />
        </div>
      );

    return (
        <Grid container className={classes.root}>
          <LinedTitle>
            عروضنا الجميلة 
          </LinedTitle>
          <SlickSlider>
          {products}
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

