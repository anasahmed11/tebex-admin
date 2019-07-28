import React from 'react';
import 'typeface-roboto';
import Avatar from '@material-ui/core/Avatar';



function ProfileAvatar (props){
    
    return <Avatar alt="Remy Sharp" src={props.img} style={props.style} />
}


export default ProfileAvatar;