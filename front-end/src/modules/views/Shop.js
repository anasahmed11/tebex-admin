import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import globalVariables from '../../global-variables';

import TextBanner from '../components/parts/TextBanner';
import ProductsListWrapper from '../components/wrappers/ProductsListWrapper';

import { styles } from '../../assets/jss/views/Shop';

class Shop extends Component {
  state = {
    
  }

  render() {
    const {classes} = this.props;

    return (
        <Grid container justify='center'>
          <TextBanner text={globalVariables.LABEL_SHOP_BANNER[globalVariables.LANG]} />
          <Grid container item sm={10} xs={12} className={classes.shopComponentContainer}>
            <ProductsListWrapper />
          </Grid>
        </Grid>
    );
  }
}

export default withStyles(styles)(Shop);