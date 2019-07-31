import React from 'react';
import { Switch, Route } from 'react-router-dom';

import globalVariables from '../../global-variables';

import { withStyles, Grid, SnackbarContent  } from '@material-ui/core';
import 'typeface-roboto';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import Profile from '../components/wrappers/Profile';
import UserPanelSettings from '../components/wrappers/UserPanelSettings';
import UserDashBoard from '../components/wrappers/UserDashBoard';
import LinkGenerator from '../components/wrappers/LinkGenerator';
import Tree from '../components/wrappers/Tree';
import Orders from '../components/wrappers/UserOrders';
import Affiliate from '../components/wrappers/Affiliate';
import Seller from '../components/wrappers/Seller';
import AddProduct from '../components/wrappers/AddProduct';
import MyProducts from '../components/wrappers/MyProducts';
import SellingOrders from '../components/wrappers/SellingOrders';


const styles = theme => ({
    root: {
      backgroundColor: 'white ',
      padding: `${theme.spacing.unit * 4}px 0px`,
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    
});

class UserpanelLayout extends React.Component{
    state ={
    }
    
    render(){
        const {classes, } = this.props;
        
        return(
            <React.Fragment>
                {
                    this.props.user.verified===false?
                    <Grid container item sm={12} justify="center" alignItems="center">
                        <SnackbarContent className={classes.error} style={{maxWidth:'100%', width:'100%', justifyContent:"center"}} message={globalVariables.MSG_VERIFIY_ACCOUNT[globalVariables.LANG]} />
                    </Grid>:null
                 }
                
            
            <Grid container justify="center" className={classes.root}>
               
                <Grid container item sm={10}>
                    <Grid container item justify="center" alignItems='flex-start' lg={3} md={4} xs={12}>
                        <Route component={UserPanelSettings} />
                    </Grid>
                    <Grid container item justify="center" alignItems='flex-start' lg={9} md={8} xs={12}>
                        <Switch>
                            <Route exact path='/profile' component={Profile} />
                            <Route exact path='/dashboard' component={UserDashBoard} />
                            <Route exact path='/linkgenerator' component={LinkGenerator} />
                            <Route exact path='/tree' component={Tree} /> 
                            <Route exact path='/orders' component={Orders} />
                            <Route exact path='/affiliate' component={Affiliate} />
                            <Route exact path='/seller' component={Seller} />
                            <Route exact path='/add_product' component={AddProduct} />
                            <Route exact path='/my_products' component={MyProducts} />
                            <Route exact path='/selling_orders' component={SellingOrders} />
                        </Switch>
                    </Grid>
                </Grid>
            </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}



export default  withRouter(connect(mapStateToProps)(withStyles(styles)(UserpanelLayout)));
