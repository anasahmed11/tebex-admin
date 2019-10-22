import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import Cookies from 'universal-cookie';
import globalVariables from './global-variables';


import { ThemeProvider } from '@material-ui/styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import 'typeface-roboto';

import { initCart } from './store/actions/shoppingCart'
import { initUser } from './store/actions/user'


import Auth from './modules/views/Auth';
import Home from './modules/views/Home';
import Shop from './modules/views/Shop';
import Product from './modules/views/Product';
import UserPanel from './modules/views/UserPanel';
import Verify from './modules/views/Verify';
import Info from './modules/views/Info';
import NotFound from './modules/views/NotFound';

import Cart from './modules/views/Cart';
import Checkout from './modules/views/Checkout';
import TrackOrder from './modules/views/TrackOrder';

import Navbar from './modules/components/wrappers/Navbar';
import Footer from './modules/components/wrappers/Footer';
import RTL from './Providers/RTL';
import { userAPI } from './api/api';
import PopupMessage from './Providers/PopupMessage';
import theme from './assets/Theme';
//import { stat } from 'fs';
import NetworkError from './modules/components/wrappers/NetworkError';
const cookies = new Cookies();

function fetchAffiliate() {
  const url = new URL(window.location.href);
  let affiliate = url.searchParams.get(globalVariables.AFFILIATE_PARAM)

  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 7)

  if (affiliate !== null) {
    cookies.set(globalVariables.AFFILIATE_COOKIE, affiliate, { path: '/', expires: expirationDate, sameSite: true })
    userAPI.post('affiliate/click/', { ref: affiliate })
  }

}



class App extends React.Component {

  state = {
    language: 'ar',
    direction: globalVariables.LANG === 'ar' ? 'rtl' : 'ltr',
    isLoading: true,
  }

  // componentWillMount = () => {
  //   document.body.dir = this.state.direction;
  //   document.body.style.backgroundColor = 'white';
  // }


  componentDidMount = () => {
    document.body.dir = this.state.direction;
    document.body.style.backgroundColor = 'white';

    this.setState({ isLoading: false })
    this.props.handleInitCart()
    this.props.handleInitUser()

    fetchAffiliate()
  }
  componentWillUnmount = () => {
    document.body.dir = null;
  }


  render() {
    const { isLoading, } = this.state;
    
    const authenticated = cookies.get(globalVariables.ACCESS_TOKEN) !== undefined

    const affiliate = this.props.program.affiliate === "Approved"
    const seller = this.props.program.seller === "Approved"
    return (

      <LoadingScreen
        loading={isLoading || this.props.userIsLoading}
        bgColor='#5D1F62'
        spinnerColor='#FFB3E0'
        textColor='#676767'
      >
        {isLoading || this.props.userIsLoading ? <div></div> :
          <RTL>

            <ThemeProvider theme={theme}>

              <Navbar />
              <NetworkError error={this.props.netwrokError}>
                <Switch>
                  <Route exact path='/checkout' component={withRouter(Checkout)} />

                  <Route exact path='/product/:id+' component={withRouter(Product)} />
                  <Route exact path='/shop' component={withRouter(Shop)} />
                  <Route exact path='/shop/:slug+' component={withRouter(Shop)} />
                  <Route exact path='/auth' render={props => authenticated ? <Redirect to='/profile' /> : <Auth {...props} />} />
                  <Route exact path='/verify/:id' component={withRouter(Verify)} />
                  <Route exact path='/cart' component={withRouter(Cart)} />
                  <Route exact path="/(profile|orders)/" render={props => authenticated ? <UserPanel {...props} /> : <Redirect to='/auth' />} />
                  <Route exact path='/(|Home)/' render={() => <Home affiliate={affiliate} seller={seller} authenticated={authenticated} />} />
                  <Route exact path='/orders/:id/:token' component={withRouter(TrackOrder)} />

                  <Route exact path='/(about|privacy-policy|contact)' component={Info} />


                  <Route exact path="/affiliate" render={props => !affiliate ? (authenticated? <UserPanel {...props} />:<Redirect to='/auth?#login' />) : <Redirect to='/affiliate/dashboard' />} />


                  <Route exact path="/seller" render={props => !seller ? (authenticated? <UserPanel {...props} />:<Redirect to='/auth?#login' />) : <Redirect to='/seller/dashboard' />} />
                  <Route path="/(seller|affiliate)/" render={props => authenticated ? <UserPanel {...props} /> : <Redirect to='/404' />} />






                  <Route exact path='/404' component={NotFound} />


                  <Route component={NotFound} />
                </Switch>
              </NetworkError>
              <Footer />
              <PopupMessage />
            </ThemeProvider>
          </RTL>
        }
      </LoadingScreen>
    );
  }
}

library.add(fab, fas);



const mapStateToProps = state => {
  return {
    program: state.user.program,
    userIsLoading: state.user.isLoading,
    netwrokError: state.site.netwrokError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleInitCart: () => dispatch(initCart()),
    handleInitUser: () => dispatch(initUser()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));