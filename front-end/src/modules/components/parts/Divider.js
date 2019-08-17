// Requires Paper with {display: 'flex'} to be inline.
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import styles from '../../../assets/jss/components/parts/Divider.jsx';

const CustomizedInputBase = props => {
  const { classes } = props;
  return <Divider className={classes.divider} />
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputBase);