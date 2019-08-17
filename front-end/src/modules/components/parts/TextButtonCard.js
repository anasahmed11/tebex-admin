import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from '../../../assets/jss/components/parts/TextButtonCard';

const SimpleCard = props => {
  const { classes } = props;
  return <Paper onClick={props.onClick} className={classes.root}>
        <Typography variant="h6">{props.text}</Typography>
    </Paper>
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);