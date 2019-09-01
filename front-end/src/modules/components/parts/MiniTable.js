import React from 'react';
import globalVariables from '../../../global-variables';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Cancel } from '@material-ui/icons';

import styles from '../../../assets/jss/components/parts/MiniTable';

const SimpleCard = props => {
  
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
      <Button size="small" onClick={() => props.handleDetailsButton(props.id)}>{globalVariables.LABEL_DETAILS[globalVariables.LANG]}</Button>
    </Paper>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);