import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
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
        '& $subtitleDiv': {
          top: 0,
        }
    },
    minHeight: 340,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 240,
    backgroundSize: 'contain',
  },
  actions: {
  },
  subtitleDiv: {
    display: 'flex',
    padding: theme.spacing.unit * 1,
    position: 'relative',
    top: 40,
    transition: 'all 0.4s ease'
  },
  subtitle: {
    color: 'blue',
  },
  subtitleOld: {
    color: 'gray',
    textDecorationLine: 'line-through',
    alignSelf: 'center',
    marginRight: theme.spacing.unit * 1,
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
      <Link to={`product/${props.id}`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          style = {props.slider? {height: 140} : {}}
          image={props.img}
          title={props.title}
        />

        <CardContent>
          <Typography gutterBottom variant="title">
            {props.title}
          </Typography>
        </CardContent>

      </CardActionArea>
      </Link>
      <div>
        <div className={classes.subtitleDiv}>
          <Typography className={classes.subtitle} variant="headline">
            {props.subtitle} {props.currency}
          </Typography>
          {props.subtitleOld?
            <Typography className={classes.subtitleOld} variant="subtitle">
              {props.subtitleOld}
            </Typography> : null
          }
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
