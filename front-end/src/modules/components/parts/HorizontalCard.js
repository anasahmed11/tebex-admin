import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  card: {
    display: 'flex',
    height: 400,
  },
  details: {
    display: 'flex',
    flex: '1 0 60%',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    backgroundColor: '#f50057',
    color:'white',
  },
  cover: {
    width: '100%',
  },
});

function MediaControlCard(props) {
  const { classes, person } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography gutterBottom component="h2" variant="h5" color="inherit">
            {person.name}
          </Typography>
          <Typography variant="p" color="inherit">
            {person.description}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image = {person.image}
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