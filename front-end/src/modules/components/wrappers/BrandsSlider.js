import React from "react";
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import SlickSlider from '../parts/SlickSlider';
import LinedTitle from '../parts/TwoLinesSectionTitle';
 
import styles from '../../../assets/jss/components/wrappers/BrandsSlider';


const someBrands = [
    'https://www.mobilaty.com/wp-content/uploads/2018/11/download.png',
    'https://www.mobilaty.com/wp-content/uploads/2018/10/Xiaomi_logo.png',
    'https://www.mobilaty.com/wp-content/uploads/2018/11/download.png',
    'https://www.mobilaty.com/wp-content/uploads/2018/10/Xiaomi_logo.png',
]

const BrandsSlider = props => {
    
    const { classes } = props

    const brands = someBrands.map(item =>
        <div className={classes.brandDiv} key={uuid()}>
          <img className={classes.brandImg} src={item} alt="img" />
        </div>
      );

    return (
        <Grid container className={classes.root}>
          <LinedTitle>
            {globalVariables.LABEL_HOME_BRANDS_SLIDER[globalVariables.LANG]}
          </LinedTitle>
          <SlickSlider squares arrowColor="#FFF" className={classes.sliderLayout}>
            {brands}
            {brands}
            {brands}
          </SlickSlider>
        </Grid>
    );
}

BrandsSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrandsSlider);

