import React from 'react';
import globalVariables from '../../global-variables';

import Carousel from '../components/parts/Carousel';
import BrandsSlider from '../components/wrappers/BrandsSlider';
import ProductSlider from '../components/wrappers/ProductsSlider';
import CompanyInfo from '../components/wrappers/CompanyInfo';
import AboveFooter from '../components/wrappers/AboveFooter';
import { Helmet } from "react-helmet";


import 'typeface-roboto';

/*
const companyInfo = [
  {
    title: 'نبذة عن الشركة',
    description: `هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا`,
    image: 'https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Company-512.png',
    icon: { set: 'fas', name: 'heart' }
  },
  {
    title: 'نبذة عن الشركة طويلة',
    description: `هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا`,
    image: 'https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Company-512.png',
    icon: { set: 'fas', name: 'calendar-check' }
  },
  {
    title: 'نبذة عن الشركة',
    description: `هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا`,
    image: 'https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Company-512.png',
    icon: { set: 'fas', name: 'layer-group' }
  },
]
*/

function Home(props) {
  console.log(props.affiliate)
  return (
    <React.Fragment>
      <Helmet>
        <title>{globalVariables.PAGE_TITLE_HOME[globalVariables.LANG]}</title>
      </Helmet>
      <Carousel />
      <BrandsSlider />
      <ProductSlider />
      <CompanyInfo info={globalVariables.HOME_AFFILIATE} authenticated join={!props.affiliate} link={props.affiliate?'/affiliate/dashboard':'/affiliate'} />
      <AboveFooter info={globalVariables.HOME_SELLER} authenticated join={!props.seller} link={props.seller?'/seller/waiting-orders':'/seller'} />
    </React.Fragment>
  );

}

export default Home;
