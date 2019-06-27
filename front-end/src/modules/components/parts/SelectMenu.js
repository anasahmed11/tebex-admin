import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import uuid from 'uuid';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    fontSize:'12px',
    width: 150,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    //width: 200,
  },
  font:{
    fontSize:'12px'
  }
});


class SelectMenu extends React.Component {
	  

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes, values, name } = this.props;

    return (
      
        <TextField
          id={this.props.id}
          select
          label={this.props.label}
          helperText={this.props.help}
          className={classes.textField}
          value={this.props.value}
          onChange={(event) => this.props.handleChange(name,event.target.value)}
          
          InputProps={{
            classes: {
              input: classes.font,
            },
          }}
         
          variant="outlined"
        >
          {values!==undefined?values.map(value => (
            <MenuItem key={uuid()} value={value}>
              {value}
            </MenuItem>
          )):null}
        </TextField>
     
    );
  }
}

SelectMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectMenu);
