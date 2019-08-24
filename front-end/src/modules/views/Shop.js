import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import globalVariables from '../../global-variables';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import TextBanner from '../components/parts/TextBanner';
import ProductsListWrapper from '../components/wrappers/ProductsListWrapper';

import styles from '../../assets/jss/views/Shop';

class Shop extends Component {
componentDidMount(){
  console.log('Shop Mount');
}
  render() {
    const { classes } = this.props;
    console.log('Shop Render');
    return (
      <Grid container justify='center'>
        <Helmet>
          <title>{globalVariables.PAGE_TITLE_SHOP[globalVariables.LANG]}</title>
        </Helmet>
        <TextBanner text={globalVariables.LABEL_SHOP_BANNER[globalVariables.LANG]} />
        <Grid container item sm={10} xs={12} className={classes.shopComponentContainer}>
          <ProductsListWrapper />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Shop);