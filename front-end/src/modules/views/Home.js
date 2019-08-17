import React, { Component } from 'react';

import Carousel from '../components/parts/Carousel';
import ShopStores from '../components/wrappers/ShopBranches';
import LinksMenu from '../components/wrappers/LinksMenu';
import ProductSlider from '../components/wrappers/ProductsSlider';
import CompanyInfo from '../components/wrappers/CompanyInfo';
import TopCustomer from '../components/wrappers/HonorBoard';
import ScrollAnimation from 'react-animate-on-scroll';

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
            <ScrollAnimation animateIn="bounce">
              <ProductSlider />
            </ScrollAnimation>
            <CompanyInfo />
        </React.Fragment>
    );
  }
}

export default Home;
