import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import uuid from 'uuid';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: theme.spacing(2),
  },
  textField: {
    width: 150,
    marginLeft: theme.spacing(1),
  },
  dense: {
  },
  input: {
    padding: theme.spacing(1.5),
  }
});


class SelectMenu extends React.Component {
  render() {
    const { classes, values, name, sideLabel, selectedValue } = this.props;
    return (
        <div className={classes.container}>
          {sideLabel? <Typography>{sideLabel}</Typography> : null}
          <TextField
            id={this.props.id}
            select
            label={this.props.label}
            helperText={this.props.help}
            className={classes.textField}
            value={selectedValue}
            onChange={(event) => this.props.handleChange(name, event.target.value)}
            
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
          
            variant="outlined"
          >
            {values !== undefined? values.map(value => (
              <MenuItem key={uuid()} value={value}>
                {value}
              </MenuItem>
            )):null}
          </TextField>
        </div>
    );
  }
}

SelectMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectMenu);
