import React from 'react';
import Cookies from 'universal-cookie';
import globalVariables from '../../../global-variables';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import 'typeface-roboto';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core';

const cookies = new Cookies();
const color = cookies.get(globalVariables.AVATAR_COLOR_COOKIE);

const styles = theme => ({
    avatar: {
        backgroundColor: color ? color : '',
        width: '24px',
        height: '24px',
    },
})

const ProfileAvatar = props => {
    const { classes, } = props;
    const style = props.style===undefined?{}:props.style;
    if (props.gender !== undefined) {
        style.backgroundColor = props.gender==='M'?'lightslategrey':'lightcoral';
    }

    return <Avatar
            alt="Remy Sharp"
            className={classes.avatar}
            src={props.user.img}
            {...props}
        >
            {props.user.first_name ? props.user.first_name[0].toUpperCase() : ''}
        </Avatar>
}

const mapStateToProps = state => {
    return {
        user: state.user.user,

    }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ProfileAvatar)));
