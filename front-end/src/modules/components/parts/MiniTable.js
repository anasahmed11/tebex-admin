import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {Cancel} from '@material-ui/icons';
import globalVariables from '../../../global-variables';


const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection:  'column',
    cursor: 'pointer',
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    boxShadow: '0px 0px 1px 0px',
    flexBasis: 'calc(25% - 50px)',
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
  title: {
    fontSize: 14,
  },
  row: {
    display: 'flex',
  },
  rowKey: {
    flex: '1 0 25%',
    fontWeight: 'bold',
  },
  rowVal: {
    flex: '1 0 75%',
  },
  addressContainer: {
    height: '100%',
  },
  deleteIcon:{
    position:'absolute',
    top:'-12px',
    left:'-12px',
    backgroundColor:'white',
    transitionProperty: 'transform, color',
    '&:hover': {
      color: 'darkred',
      transform: 'scale(1.2,1.2)',
    },
  }
});

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root} style={props.selected? {border: '1px solid blue', backgroundColor: '#fefafa'} : {}} onClick={props.onClick}>
      <Cancel onClick={()=>props.handleDelete(props.id)} color="secondary" className={classes.deleteIcon} />
      <div className={classes.addressContainer}>
        <div className={classes.row}>
          <Typography gutterBottom className={classes.rowKey}>{globalVariables.LABEL_NAME[globalVariables.LANG]}</Typography>
          <Typography gutterBottom className={classes.rowVal}>{props.name}</Typography>
        </div>
        <div className={classes.row}>
          <Typography gutterBottom className={classes.rowKey}>{globalVariables.LABEL_ADDRESS[globalVariables.LANG]}</Typography>
          <Typography gutterBottom className={classes.rowVal}>{props.address}</Typography>
        </div>
        <div className={classes.row}>
          <Typography gutterBottom className={classes.rowKey}>{globalVariables.LABEL_PHONE[globalVariables.LANG]}</Typography>
          <Typography gutterBottom className={classes.rowVal}>{props.phone}</Typography>
        </div>
      </div>
      <Button size="small">{globalVariables.LABEL_DETAILS[globalVariables.LANG]}</Button>
    </Paper>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);