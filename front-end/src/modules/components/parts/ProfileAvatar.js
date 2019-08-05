import React from 'react';
import 'typeface-roboto';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core';
import Cookies from 'universal-cookie';
import globalVariables from '../../../global-variables';

const cookies = new Cookies();
const color = cookies.get(globalVariables.AVATAR_COLOR_COOKIE);

const styles = theme => ({
    avatar: {
      backgroundColor: color?color:'',
      
    },
})

function ProfileAvatar (props){
    const { classes, } = props;
    return <Avatar 
        alt="Remy Sharp" 
        className={classes.avatar} 
        src={props.img} 
        style={props.style} >
        {props.name?props.name[0].toUpperCase():''}</Avatar>
}


export default withStyles(styles)(ProfileAvatar);
