import React from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import globalVariables from '../../../global-variables';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@material-ui/core';

import { addToCart } from '../../../store/actions/shoppingCart';

const styles = theme => ({
  card: {
    transform: 'scale(0.95)',
    border: '1px solid #eee',
    transition: '0.3s',
    boxShadow: '0px 0px 0px 0px',
    '&:hover': {
        // transform: 'scale(1)',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
        '& $button': {
          opacity: 1,
          top: 0,
        },
        '& $priceDiv': {
          top: 0,
        }
    },
    minHeight: 340,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 200,
    backgroundSize: 'contain',
  },
  actions: {
  },
  priceDiv: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    position: 'relative',
    top: 40,
    transition: 'all 0.4s ease'
  },
  price: {
    color: 'blue',
  },
  oldPriceDiv: {
    display: 'flex',
  },
  oldPrice: {
    color: 'gray',
    textDecorationLine: 'line-through',
    marginRight: theme.spacing(1),
  },
  discount: {
    padding: '2px 4px 2px 4px',
    marginRight: theme.spacing(1),
    marginTop: '2px',
    height: 'fit-content',
    border: '1px solid #eded2c',
    borderRadius: '2px',
    background: 'yellow',
    fontWeight: 'bold',
    fontSize: '10px',
  },
  button: {
    opacity: 0,
    top: 20,
    transition: 'all 0.4s ease'
  }
});

function MediaCard(props) {
  
  const { classes } = props;

  return (
    <Card className={classes.card} style={props.flex? {width: '100%'}: props.slider? {maxWidth: 290} : {}}>
      <Link style={{textDecorationLine: 'none'}} to={`product/${props.id}`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          style={props.slider? {height: 140} : {}}
          image={props.img}
          title={props.title}
        />

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
