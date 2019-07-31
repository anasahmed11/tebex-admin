import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import SlickSlider from '../parts/SlickSlider';
import Product from '../parts/ProductCard';
import LinedTitle from '../parts/TwoLinesSectionTitle';

import { productsAPI as axios } from '../../../api/api';
 
const styles = theme => ({
  root: {
    backgroundColor: '#1E3953',
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 4,
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
    axios.get('/')
    .then(res => {
        const { products } = this.state;
        for (let item of res.data){
          // First image for this product
          let link = item.images[0];
          products.push({
            id: item.id,
            img: link,
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
            subtitle={item.salePrice? item.salePrice : item.price}
            subtitleOld={item.salePrice? item.price : false}
            currency={'جنيه'}
            img={item.img?item.img:noImage}
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
          </SlickSlider>
        </Grid>
    );
  }
}

ProductSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductSlider);

