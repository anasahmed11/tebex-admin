import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import StoreBanner from '../components/parts/TextBanner';
import ShopComponent from '../components/wrappers/ShopComponent';


const styles = theme => ({
  shopComponent: {
      boxShadow: '0px 0px 20px 0px gray',
      marginTop: -8 * theme.spacing.unit ,
      marginBottom: 8 * theme.spacing.unit ,
  }
})


class Shop extends Component {

  state = {
    
  }

  _handleWaypointEnter = () => {
    alert("entered");
  }

  render() {
    const {classes} = this.props;
    const {products} = this.state;
    return (
        <Grid container>
          <StoreBanner text='تسوق يلا' />
          <Grid container justify='center'>
            <Grid lg={10} className={classes.shopComponent}>
              <ShopComponent items = {products} />
            </Grid>
          </Grid>
        </Grid>
    );
  }
}

export default withStyles(styles)(Shop);