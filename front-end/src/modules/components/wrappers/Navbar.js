import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import globalVariables from '../../../global-variables';

import AppBar from '../parts/AppBar';
import Drawer from '../parts/MobileDrawer';
import SupportNavbar from '../parts/AboveAppBar';
import BelowAppBar from '../parts/BelowAppBar';


const logo = '/logo-ar.png';

const upperLinks = [
  globalVariables.UPPERBAR_US[globalVariables.LANG],
  globalVariables.UPPERBAR_Q[globalVariables.LANG],
  globalVariables.UPPERBAR_MAGAZINE[globalVariables.LANG],
  globalVariables.UPPERBAR_CALL_US[globalVariables.LANG],  
];

const bottomLinks = ['تسجيل دخول', 'اللغة', 'الهبد'];

class Navbar extends Component {

  state = {
    drawer: false,
    categories: []
  }


  drawerHandler = e => {
    const {drawer} = this.state;
    this.setState({
        drawer: !drawer,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Drawer
            open={this.state.drawer}
            closeHandler={this.drawerHandler}
            upperLinks={upperLinks}
            bottomLinks={bottomLinks}
        />
        <SupportNavbar links={upperLinks} language={globalVariables.UPPERBAR_LANGUAGE[globalVariables.LANG]} />
        <AppBar logo={logo} menuButtonHandler={this.drawerHandler} />
        <BelowAppBar />
      </React.Fragment>
    );
  }
}

export default withRouter(Navbar);
