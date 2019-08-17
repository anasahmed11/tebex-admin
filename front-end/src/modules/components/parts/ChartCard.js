import React from 'react';
import globalVariables from '../../../global-variables';

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import styles from '../../../assets/jss/components/parts/ChartCard';

function SimpleCard(props) {
  const { classes } = props;

  return <Card className={classes.card} style={props.style}>
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
        <Button size="small">{globalVariables.LABEL_DETAILS[globalVariables.LANG]}</Button>
      </CardActions>
    </Card>
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);