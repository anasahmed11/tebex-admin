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
      <Cancel onClick={()=>props.handleDelete(props.id, props.token)} color="secondary" className={classes.deleteIcon} />
      <div className={classes.addressContainer}>
        <div className={classes.row}>
          <Typography gutterBottom className={classes.rowKey}>Method: </Typography>
          <Typography gutterBottom className={classes.rowVal}>{props.method}</Typography>
        </div>
        <div className={classes.row}>
          <Typography gutterBottom className={classes.rowKey}>Account</Typography>
        </div>
        {
          Object.entries(props.account).map(
            ([key, value]) => <div className={classes.rowNested}>
                                <Typography gutterBottom className={classes.rowKey}>{key}: </Typography>
                                <Typography gutterBottom className={classes.rowVal}>{value}</Typography>
                              </div>)
        }
      </div>
      <Button size="small" onClick={() => props.handleDetailsButton(props.id)}>{globalVariables.LABEL_DETAILS[globalVariables.LANG]}</Button>
    </Paper>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);