import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  input: {
    flex: 1,
    margin: theme.spacing(1),
  },
  iconButton: {
  },
});

function CustomizedInputBase(props) {
  const { classes } = props;
  
  const searchIconButton = props.searchIcon?
    (<IconButton className={classes.iconButton} aria-label="Search">
      <SearchIcon />
    </IconButton>) : null;

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase className={classes.input} placeholder={props.placeholder} fullWidth />
      {searchIconButton}
    </Paper>
  );
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputBase);