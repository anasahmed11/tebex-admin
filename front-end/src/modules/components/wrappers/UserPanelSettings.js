import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Paper, Typography,  } from '@material-ui/core';

import {connect} from 'react-redux';

import { Route, withRouter } from 'react-router-dom';

import ProfileAvatar from '../parts/ProfileAvatar';
import SettingsSection from '../parts/SettingsSection';

const styles = theme => ({
    root: {
        backgroundColor: 'white ',
        // padding: `${theme.spacing(4)}px 0px`,
    },
    menuItem: {
        textAlign:'inherit',
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {},
    link:{
        textDecoration:'none'
    },
    settingsMenu: {
        width: '100%',
        marginBottom: theme.spacing(4),
    },
    avatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    avatarDiv: {
        display: 'flex',
        alignItems: 'center',
    },
    textHead:{
        fontWeight:'500',
        [theme.breakpoints.down('xs')]: {
            fontSize: 18,
        }
    },
    textMail: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        }
    }
});

function UserPanelSettings (props){
    const {classes, } = props;

    return(
        <Grid container item justify='center' xs={11} className={classes.root}>
            <Grid item xs={12} className={classes.avatarDiv}>
                <ProfileAvatar img={props.user.img} name={props.user.first_name} style={{ margin: 10, width: 60, height: 60,}}/>
                <div>
                    <Typography variant='h6' className={classes.textHead}>{props.user.first_name} {props.user.last_name}</Typography>
                    <Typography variant='subtitle1' className={classes.textMail}>{props.user.email}</Typography>
                </div>
            </Grid>
            <Grid container item xs={12}>
                <Paper className={classes.settingsMenu}>
                    <Route component={SettingsSection} />
                </Paper>
                
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        
    }
}


export default  withRouter(connect(mapStateToProps)(withStyles(styles)(UserPanelSettings)));