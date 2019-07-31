import React from 'react';
import {connect} from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import Cookies from 'universal-cookie';
import globalVariables from './global-variables';


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'

import 'typeface-roboto';

import { initCart } from './store/actions/shoppingCart'
import { initUser } from './store/actions/user'


import Auth from './modules/views/Auth';
import Home from './modules/views/Home';
import Product from './modules/views/Product';
import Shop from './modules/views/Shop';
import UserPanel from './modules/views/UserPanel';
import Verify from './modules/views/Verify';
import NotFound from './modules/views/NotFound';
import Blank from './modules/views/Blank';

import Cart from './modules/views/Cart';
import Checkout from './modules/views/Checkout';
import TrackOrder from './modules/views/TrackOrder';

import Navbar from './modules/components/wrappers/Navbar';
import Footer from './modules/components/wrappers/Footer';


const cookies = new Cookies();

function fetchAffiliate(){
  const url = new URL(window.location.href);
  let affiliate = url.searchParams.get(globalVariables.AFFILIATE_PARAM)

  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate()+7)
  
  if(affiliate !== null) cookies.set(globalVariables.AFFILIATE_COOKIE, affiliate, { path: '/', expires: expirationDate, sameSite : true })
  
}

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
    this.props.handleInitUser()

    fetchAffiliate()
    
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
    const affiliate = this.props.program.affiliate==="Approved"
    const seller = this.props.program.seller==="Approved"
    
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
            <Route exact path = '/shop/:slug+' component = {Shop}/>
            <Route exact path = '/auth' render = {props =>authenticated?<Redirect to = '/profile'/>:<Auth {...props} />} /> 
						<Route exact path = '/verify/:id' component = {Verify}/>
            <Route exact path = '/cart' component = {Cart}/>

            <Route exact path = "/(profile|orders)/"  render = {props =>authenticated?<UserPanel {...props} />:<Redirect to = '/auth'/> } />

            <Route exact path = "/affiliate" render = {props =>!affiliate?<UserPanel {...props} />:<Redirect to = '/404'/> } />
            {this.props.program.affiliate!==undefined?
            <Route exact path = "/(dashboard|tree|linkgenerator)/" render = {props =>affiliate?<UserPanel {...props} />:<Redirect to = '/404'/> } />
            :null
            }
            
            <Route exact path = "/seller" render = {props =>!seller?<UserPanel {...props} />:<Redirect to = '/404'/> } />}
            {this.props.program.seller!==undefined?
            <Route exact path = "/(my_products|add_product|selling_orders)/" render = {props =>seller?<UserPanel {...props} />:<Redirect to = '/404'/> } />
            :null
            }
            <Route exact path = '/orders/:id/:token' component = {TrackOrder} />
            
            <Route exact path = '/' component = {Home}/>

            <Route exact path = '/404' component = {NotFound}/>
            
            {this.props.program.affiliate===undefined || this.props.program.seller===undefined?
            <Route component = {Blank}/>:null
            }
            
            <Route component = {NotFound}/>
          </Switch>
          <Footer />
        </MuiThemeProvider>

      </LoadingScreen>
    );
  }
}

library.add(fab,fas);



const mapStateToProps = state => {
  return {
      program: state.user.program,
  }
}

const mapDispatchToProps = dispatch => {
  return{
      handleInitCart: () => dispatch(initCart()),
      handleInitUser: () => dispatch(initUser()),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));