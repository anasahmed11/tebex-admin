import React, { Component } from 'react';

import Carousel from '../components/parts/Carousel';
import ProductSlider from '../components/wrappers/ProductsSlider';
import CompanyInfo from '../components/wrappers/CompanyInfo';
// import ShopStores from '../components/wrappers/ShopBranches';
// import LinksMenu from '../components/wrappers/LinksMenu';
// import TopCustomer from '../components/wrappers/HonorBoard';

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
            <Carousel />
            <ProductSlider />
            <CompanyInfo />
        </React.Fragment>
    );
  }
}

export default Home;
