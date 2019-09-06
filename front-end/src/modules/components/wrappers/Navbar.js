import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import globalVariables, { upperLinks, bottomLinks } from '../../../global-variables';

import AppBar from '../parts/AppBar';
import Drawer from '../parts/MobileDrawer';
import SupportNavbar from '../parts/AboveAppBar';
import BelowAppBar from '../parts/BelowAppBar';


const logo = '/logo-ar.png';



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
        <SupportNavbar links={upperLinks}/>
        <AppBar logo={logo} menuButtonHandler={this.drawerHandler} />
        <BelowAppBar />
      </React.Fragment>
    );
  }
}

export default withRouter(Navbar);
