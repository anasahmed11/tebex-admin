import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid,  } from '@material-ui/core';
import UserPanelSettings from '../components/wrappers/UserPanelSettings';
import { Switch, Route } from 'react-router-dom';

import Profile from '../components/wrappers/Profile';
import UserDashBoard from '../components/wrappers/UserDashBoard';
import LinkGenerator from '../components/wrappers/LinkGenerator';
import Tree from '../components/wrappers/Tree';
import Orders from '../components/wrappers/UserOrders';

const styles = theme => ({
    root: {
      backgroundColor: 'white ',
      padding: `${theme.spacing.unit * 4}px 0px`,
    },
    
});

class UserpanelLayout extends React.Component{
    state ={
    }
    
    render(){
        const {classes, } = this.props;
        
        return(
            <Grid container justify="center" className={classes.root}>
                <Grid container sm={10}>
                    <Grid container justify="center" alignItems='flex-start' lg={3} md={4} xs={12}>
                        <Route component={UserPanelSettings} />
                    </Grid>
                    <Grid container justify="center" alignItems='flex-start' lg={9} md={8} xs={12}>
                        <Switch>
                            <Route exact path='/profile' component={Profile} />
                            <Route exact path='/dashboard' component={UserDashBoard} />
                            <Route exact path='/linkgenerator' component={LinkGenerator} />
                            <Route exact path='/tree' component={Tree} /> 
                            <Route exact path='/orders' component={Orders} />
                        </Switch>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(UserpanelLayout);
