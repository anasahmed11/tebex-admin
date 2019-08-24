import React, { useState } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { MoonLoader } from "react-spinners";
import LazyLoad from 'react-lazy-load';
import globalVariables from '../../../global-variables';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';

import { addToCart } from '../../../store/actions/shoppingCart';

import styles from '../../../assets/jss/components/parts/ProductCard';


const Loading = (props) => 
  <Grid container justify="center" style={{height: props.height, display: props.loading? 'flex':'none'}} >
    <MoonLoader css={`margin: auto`} color={'#594589'} loading={props.loading} />
  </Grid>

function MediaCard(props) {
  
  const { classes } = props;
  const [loading, setLoading] = useState(true);

  return (
    <Card className={classes.card} style={props.flex? {width: '100%'} : props.slider? {maxWidth: 290, margin: 'auto'} : {}}>
      <Link style={{textDecorationLine: 'none'}} to={`/product/${props.id}`}>
      <CardActionArea>
        {props.lazy?
          <React.Fragment>
            <Loading height={props.slider? 140 : 200} loading={loading} />
            <LazyLoad onContentVisible={() => setLoading(false)}>
              <CardMedia
                className={classes.media}
                style={props.slider? {height: 140} : {}}
                image={props.img}
                title={props.title}
              />
            </LazyLoad>
          </React.Fragment>
          : <CardMedia
              className={classes.media}
              style={props.slider? {height: 140} : {}}
              image={props.img}
              title={props.title}
            />
        }

        <CardContent style={{padding: '4px 10px 4px 10px',}}>
          <Typography gutterBottom variant="overline">
            الشركة
          </Typography>
          <Typography gutterBottom variant="h6">
            {props.title}
          </Typography>
        </CardContent>

      </CardActionArea>
      </Link>
      <div>
        <div className={classes.priceDiv}>
          {props.oldPrice?
            <div className={classes.oldPriceDiv}>
              <Typography className={classes.oldPrice} variant="subtitle1">
                {props.oldPrice} {props.currency}
              </Typography> 
              <Typography className={classes.discount} variant="subtitle2">
                {Math.round((props.oldPrice - props.price) * 100 / props.oldPrice)}% {globalVariables.LABEL_PRODUCT_DISCOUNT[globalVariables.LANG]}
              </Typography> 
            </div>
            : null
          }
          <Typography className={classes.price} variant="h6">
            {props.price} {props.currency}
          </Typography>
        </div>
        <CardActions className={classes.actions}>
          <Button className={classes.button} fullWidth color="primary" onClick={() => props.addProductToCart(props.product)}>
            اضف لسلة التسوق
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return{
      addProductToCart: (product) => dispatch(addToCart(product, 1, true)),
     
  }
}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(MediaCard)));
