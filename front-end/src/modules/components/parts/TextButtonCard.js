import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    boxShadow: '0px 0px 1px 0px',
    flexBasis: 'calc(25% - 48px)',
    transition: 'background-color 0.3s ease-in-out',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 2,
    },
    [theme.breakpoints.down('md')]: {
        flexBasis: '100%'
    },
    '&:hover': {
      backgroundColor: '#fefafa',
    }
  },
});

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Paper onClick={props.onClick} className={classes.root}>
        <Typography variant="h6">{props.text}</Typography>
    </Paper>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);