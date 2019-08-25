import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import globalVariables from '../../global-variables';

import { withStyles, Grid, SnackbarContent, Button } from '@material-ui/core';
import 'typeface-roboto';

import Profile from '../components/wrappers/Profile';
import UserPanelSettings from '../components/wrappers/UserPanelSettings';
import AffiliateDashboard from '../components/wrappers/AffiliateDashBoard';
import LinkGenerator from '../components/wrappers/LinkGenerator';
import Tree from '../components/wrappers/Tree';
import Orders from '../components/wrappers/UserOrders';
import Affiliate from '../components/wrappers/Affiliate';
import Seller from '../components/wrappers/Seller';
import AddProduct from '../components/wrappers/AddProduct';
import MyProducts from '../components/wrappers/MyProducts';
import SellingOrders from '../components/wrappers/SellingOrders';

import NotFound from '../views/NotFound';

import Helmet from 'react-helmet';
import styles from '../../assets/jss/views/UserPanel';
import { resendAPI } from '../../api/api';

class UserpanelLayout extends React.Component {

    state = {

    }

    render() {
        const { classes, } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>{globalVariables.PAGE_TITLE_USER_PANEL[globalVariables.LANG]}</title>

                </Helmet>
                {
                    this.props.user.verified === false ?
                        <Grid container item sm={12} justify="center" alignItems="center">
                            <SnackbarContent 
                                className={classes.error} 
                                style={{ maxWidth: '100%', width: '100%', justifyContent: "center" }} 
                                message={
                                    <div>
                                        {globalVariables.MSG_VERIFIY_ACCOUNT[globalVariables.LANG]} <Link style={{color:'white'}} onClick={()=>resendAPI.get('')}>{globalVariables.LABEL_RESEND[globalVariables.LANG]}</Link>
                                    </div>
                                } 
                            />
                        </Grid> : null
                }


                <Grid container justify="center" className={classes.root}>

                    <Grid container item sm={10}>
                        <Grid container item justify="center" alignItems='flex-start' lg={3} md={4} xs={12}>
                            <Route component={UserPanelSettings} />
                        </Grid>
                        <Grid container item justify="center" alignItems='flex-start' lg={9} md={8} xs={12}>
                            <Switch>
                                <Route exact path='/profile' component={Profile} />
                                <Route exact path='/affiliate/dashboard' component={AffiliateDashboard} />
                                <Route exact path='/affiliate/linkgenerator' component={LinkGenerator} />
                                <Route exact path='/affiliate/tree' component={Tree} />
                                <Route exact path='/orders' component={Orders} />
                                <Route exact path='/affiliate' component={Affiliate} />
                                <Route exact path='/seller' component={Seller} />
                                <Route exact path='/seller/add-product' component={AddProduct} />
                                <Route exact path='/seller/edit-product/:id' component={AddProduct} />
                                <Route exact path='/seller/my-products' component={MyProducts} />
                                <Route exact path='/seller/waiting-orders' component={SellingOrders} />
                                {/*<Route exact path='/seller/dashboard' component={SellerDashBoard} />*/}
                                <Route component={NotFound} />
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



export default withRouter(connect(mapStateToProps)(withStyles(styles)(UserpanelLayout)));
