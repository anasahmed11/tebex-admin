import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
    flexBasis: 'calc(50% - 15px)',
    [theme.breakpoints.down('md')]: {
        flexBasis: '100%'
    },
    [theme.breakpoints.down('xs')]: {
        flexBasis: '100%'
    },
  },
  title: {
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
        {props.highlight}
        <Typography className={classes.pos} color="textSecondary">
          {props.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">تفاصيل</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);