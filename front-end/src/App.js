import React from 'react';
import {connect} from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import Cookies from 'universal-cookie';
import globalVariables from './global-variables';


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'typeface-roboto';

import { initCart } from './store/actions/shoppingCart'

import Auth from './modules/views/Auth';
import Home from './modules/views/Home';
import Product from './modules/views/Product';
import Shop from './modules/views/Shop';
import UserPanel from './modules/views/UserPanel';
import Verify from './modules/views/Verify';
import NotFound from './modules/views/NotFound';
import Cart from './modules/views/Cart';
import Checkout from './modules/views/Checkout';
import TrackOrder from './modules/views/TrackOrder';

import Navbar from './modules/components/wrappers/Navbar';
import Footer from './modules/components/wrappers/Footer';


const cookies = new Cookies();

class App extends React.Component {

  state = {
    language: 'ar',
    direction: globalVariables.LANG==='ar'?'rtl':'ltr',
    isLoading: true,
  }

  componentWillMount = () => {
    document.body.dir = this.state.direction;
    document.body.style.backgroundColor = 'white';
  }

  componentDidMount = () => {
    this.setState({isLoading:false})
    this.props.handleInitCart()
  }
  componentWillUnmount = () => {
    document.body.dir = null;
  }

  theme = createMuiTheme({
    typography: { 
      useNextVariants: true,
      fontFamily: "'Droid Arabic Kufi', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    direction: this.state.direction,
  });

  _handleWaypointEnter = () => {
    alert("entered");
  }
  
  render() {
    
    const { isLoading, } = this.state;
    
    const authenticated = cookies.get(globalVariables.ACCESS_TOKEN) !== undefined

    return (
      <LoadingScreen
        loading = {isLoading}
        bgColor = '#f1f1f1'
        spinnerColor = '#9ee5f8'
        textColor = '#676767'
      > 
      
        <MuiThemeProvider theme = {this.theme}>
          <Navbar />
          
          <Switch>
            <Route exact path = '/checkout' component = {Checkout} />

            <Route exact path = '/home' component = {Home}/>
            <Route exact path = '/product/:id' component = {Product}/>
            <Route exact path = '/shop' component = {Shop}/>
            <Route exact path = '/auth' render = {props =>authenticated?<Redirect to = '/profile'/>:<Auth {...props} />} /> 
						<Route exact path = '/verify/:id' component = {Verify}/>
            <Route exact path = '/cart' component = {Cart}/>
            <Route exact path = "/(profile|dashboard|tree|linkgenerator|orders|affiliate|seller)/"  render = {props =>authenticated?<UserPanel {...props} />:<Redirect to = '/auth'/> } />}
            
            <Route exact path = '/orders/:id/:token' component = {TrackOrder} />
            <Route exact path = '/' component = {Home}/>

            <Route component = {NotFound}/>
          </Switch>
          <Footer />
        </MuiThemeProvider>

      </LoadingScreen>
    );
  }
}

library.add(fab);

const mapDispatchToProps = dispatch => {
  return{
      handleInitCart: () => dispatch(initCart()),
  }
}

export default withRouter(connect(null,mapDispatchToProps)(App));