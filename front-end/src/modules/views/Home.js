import React, { Component } from 'react';

import Carousel from '../components/parts/Carousel';
import BrandsSlider from '../components/wrappers/BrandsSlider';
import ProductSlider from '../components/wrappers/ProductsSlider';
import CompanyInfo from '../components/wrappers/CompanyInfo';
import AboveFooter from '../components/wrappers/AboveFooter';

// import ShopStores from '../components/wrappers/ShopBranches';
// import LinksMenu from '../components/wrappers/LinksMenu';
// import TopCustomer from '../components/wrappers/HonorBoard';

import 'typeface-roboto';

const companyInfo = [
  {
      title:'نبذة عن الشركة',
      description:`هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا`,
      image:'https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Company-512.png',
      icon: { set: 'fas', name: 'heart' }
  },
  {
      title:'نبذة عن الشركة طويلة',
      description:`هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا`,
      image:'https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Company-512.png',
      icon: { set: 'fas', name: 'calendar-check' }
  },
  {
      title:'نبذة عن الشركة',
      description:`هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا`,
      image:'https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Company-512.png',
      icon: { set: 'fas', name: 'layer-group' }
  },
]


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
            <BrandsSlider />
            <ProductSlider />
            <CompanyInfo info={companyInfo} />
            <AboveFooter info={companyInfo} />
        </React.Fragment>
    );
  }
}

export default Home;
