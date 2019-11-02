import React from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { withStyles, Grid, Paper, Typography,  } from '@material-ui/core';
import 'typeface-roboto';

import ProfileAvatar from '../parts/ProfileAvatar';
import SettingsSection from '../parts/SettingsSection';

import styles from '../../../assets/jss/components/wrappers/UserPanelSettings';

const UserPanelSettings = props => {
    console.log('shit',props.returned)
    const {classes, } = props;
    return(
        <Grid container item justify='center' xs={11} className={classes.root}>
            <Grid item xs={12} className={classes.avatarDiv}>
                <ProfileAvatar img={props.user.img} name={props.user.first_name} style={{ margin: 10, width: 60, height: 60,}}/>
                <div>
                    <Typography variant='subtitle1'>{props.user.first_name} {props.user.last_name}</Typography>
                    <Typography variant='subtitle1' gutterBottom>{props.user.email}</Typography>
                    {props.returned?<Typography variant='overline'>Returned: {props.returned}</Typography>:null}
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
        returned: state.user.returned
    }
}

export default  withRouter(connect(mapStateToProps)(withStyles(styles)(UserPanelSettings)));