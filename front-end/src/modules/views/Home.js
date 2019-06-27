import React, { Component } from 'react';

import LinksMenu from '../components/wrappers/LinksMenu';
import ShopStores from '../components/wrappers/ShopBranches';
import ProductSlider from '../components/wrappers/ProductsSlider';
import CompanyInfo from '../components/wrappers/CompanyInfo';
import TopCustomer from '../components/wrappers/HonorBoard';

import 'typeface-roboto';

class Home extends Component {

  state = {
   
  }

  _handleWaypointEnter = () => {
    alert("entered");
  }
  render() {
    return (
        <React.Fragment>
            <ShopStores />
            <LinksMenu />
            <ProductSlider />
            <CompanyInfo />
            <TopCustomer />
        </React.Fragment>
    );
  }
}

export default Home;
