import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

import styles from '../../../assets/jss/components/parts/SelectMenu';

const SelectMenu = props => {

    const { classes, values, name, sideLabel, selectedValue, disabled } = props;
    // console.log('SELECTMENU', selectedValue)
    return (
        <div className={classes.container}>
            {sideLabel ? <Typography>{sideLabel}</Typography> : null}
            {props.version === 2 ?
                <TextField
                    {...props}
                    select
                    className={classes.textField}
                    InputProps={{
                        classes: {
                            input: classes.input,
                        },
                    }}
                    variant="outlined"
                >
                    {values !== undefined ? values.map((item, idx) => (
                        <MenuItem key={idx} value={item.value}>
                            {item.label}
                        </MenuItem>
                    )) : null}
                </TextField>
                :
                <TextField
                    id={props.id}
                    select
                    label={props.label}
                    helperText={props.help}
                    className={classes.textField}
                    value={selectedValue}
                    onChange={(event) => props.handleChange(name, event.target.value)}
                    disabled={disabled}
                    InputProps={{
                        classes: {
                            input: classes.input,
                        },
                    }}
                    variant="outlined"
                >
                    {values !== undefined ? values.map(value => (
                        <MenuItem key={uuid()} value={value}>
                            {value}
                        </MenuItem>
                    )) : null}
                </TextField>
            }
        </div>
    );
}

SelectMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectMenu);