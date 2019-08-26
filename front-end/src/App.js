import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import Cookies from 'universal-cookie';
import globalVariables from './global-variables';


import { createMuiTheme } from '@material-ui/core/styles';
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

  componentWillMount = () => {
    document.body.dir = this.state.direction;
    document.body.style.backgroundColor = 'white';
  }


  componentDidMount = () => {
    this.setState({ isLoading: false })
    this.props.handleInitCart()
    this.props.handleInitUser()

    fetchAffiliate()
    console.log("APP MOUNT")
  }
  componentWillUnmount = () => {
    document.body.dir = null;
  }

  theme = createMuiTheme({
    overrides: {
      MuiButton: {
        textPrimary: {
          color: 'white',
        },
        containedPrimary: {
          backgroundColor: '#65477e',
          '&:hover': {
            backgroundColor: '#412a55'
          }
        },

      },
      MuiExpansionPanel: {
        root: {
          border: '1px solid #5f4378',
        }
      },
      MuiExpansionPanelDetails: {
        root: {
          display: 'inherit'
        }
      },
      MuiExpansionPanelSummary: {
        root: {
          backgroundColor: '#5f4378',
          color: 'white'
        },
        expandIcon: {
          color: 'white'
        }
      },

      MuiIconButton: {
        root: {
          '&:hover':{
            backgroundColor: '#FFBAED',
          }
        }
      },
      MuiInput: {
        underline:{
          '&:hover': {
            '&:before': {
              borderBottom: '2px solid #65477e',
            },
            '&:after': {
              borderBottom: '2px solid #412a55',
            },
            '&:not(.Mui-disabled):before':{
              borderBottom: '2px solid #65477e',
            },
            
          },
          '&:not(.Mui-disabled):before':{
            borderBottom: '1px solid #65477e',
          },
          '&:before': {
            borderBottom: '1px solid #65477e',
          },
          '&:after': {
            borderBottom: '1px solid #412a55',
          },
        }
      }

    },

    typography: {
      useNextVariants: true,
      fontFamily: "'Open Sans', 'Droid Arabic Kufi', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    direction: globalVariables.LANG === 'ar' ? 'rtl' : 'ltr',
  });

  _handleWaypointEnter = () => {
    alert("entered");
  }

  render() {

    const { isLoading, } = this.state;

    const authenticated = cookies.get(globalVariables.ACCESS_TOKEN) !== undefined
    const affiliate = this.props.program.affiliate === "Approved"
    const seller = this.props.program.seller === "Approved"
    console.log("APP RENDER", isLoading || this.props.userIsLoading)
    return (

      <LoadingScreen
        loading={isLoading || this.props.userIsLoading}
        bgColor='#5D1F62'
        spinnerColor='#FFB3E0'
        textColor='#676767'
      >
        {isLoading || this.props.userIsLoading ? null :
          <RTL>

            <ThemeProvider theme={this.theme}>

              <Navbar />

              <Switch>
                <Route exact path='/checkout' component={withRouter(Checkout)} />

                <Route exact path='/home' component={withRouter(Home)} />
                <Route exact path='/product/:id' component={withRouter(Product)} />
                <Route exact path='/shop' component={withRouter(Shop)} />
                <Route exact path='/shop/:slug+' component={withRouter(Shop)} />
                <Route exact path='/auth' render={props => authenticated ? <Redirect to='/profile' /> : <Auth {...props} />} />
                <Route exact path='/verify/:id' component={withRouter(Verify)} />
                <Route exact path='/cart' component={withRouter(Cart)} />
                <Route exact path="/(profile|orders)/" render={props => authenticated ? <UserPanel {...props} /> : <Redirect to='/auth' />} />
                <Route exact path='/' component={withRouter(Home)} />
                <Route exact path='/orders/:id/:token' component={withRouter(TrackOrder)} />

                <Route exact path='/(about|privacy-policy|contact)' component={Info} />


                <Route exact path="/affiliate" render={props => !affiliate ? <UserPanel {...props} /> : <Redirect to='/404' />} />


                <Route exact path="/seller" render={props => !seller ? <UserPanel {...props} /> : <Redirect to='/404' />} />
                <Route path="/(seller|affiliate)/" render={props => authenticated ? <UserPanel {...props} /> : <Redirect to='/404' />} />






                <Route exact path='/404' component={NotFound} />


                <Route component={NotFound} />
              </Switch>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleInitCart: () => dispatch(initCart()),
    handleInitUser: () => dispatch(initUser()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));