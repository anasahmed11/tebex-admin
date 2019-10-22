import React from 'react';

import classNames from 'classnames';
import { withStyles, SnackbarContent, IconButton  } from '@material-ui/core';
import { 
  CheckCircle as CheckCircleIcon, Error as ErrorIcon, 
  Info as InfoIcon, Close as CloseIcon, Warning as WarningIcon,
} from '@material-ui/icons';

import styles from '../../../assets/jss/components/parts/MySnackbar';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };


const MySnackbarContent = props => {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }
  

export default withStyles(styles)(MySnackbarContent);