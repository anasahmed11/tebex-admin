import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import globalVariables from '../../../global-variables';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
    flexBasis: 'calc(25% - 15px)',
    [theme.breakpoints.down('md')]: {
        flexBasis: 'calc(50% - 15px)'
    },
    [theme.breakpoints.down('xs')]: {
        flexBasis: '100%'
    },
  },
  title: {
    fontSize: 14,
  },
  currency: {
    fontSize: 14,
  },
  pos: {
    
  },
});

function SimpleCard(props) {
  const { classes } = props;
  
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.highlight} <Typography color="textSecondary" inline className={classes.currency}>{props.currency}</Typography>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.desc}
        </Typography>
      </CardContent>
      <CardActions>
        {props.link?<Link to={props.link}><Button size="small">{globalVariables.LABEL_DETAILS[globalVariables.LANG]}</Button></Link>:null}
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);