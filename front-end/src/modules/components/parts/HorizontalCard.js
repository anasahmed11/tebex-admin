import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import styles from '../../../assets/jss/components/parts/HorizontalCard';

const noImage = "https://thefittingsource.com/wp-content/uploads/2017/12/temp-inventory-landing.jpg";

function MediaControlCard(props) {
  const { classes, person } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography gutterBottom component="h2" variant="h5" color="inherit">
            {person.name}
          </Typography>
          <Typography variant="body2" color="inherit">
            {person.description}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image = {person.image?person.image:noImage}
        title = {person.name}
        style = {{backgroundPosition:'top center',}}
      />
    </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);