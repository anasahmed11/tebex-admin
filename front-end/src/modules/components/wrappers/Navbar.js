import React, { Component } from 'react';

import AppBar from '../parts/AppBar';
import Drawer from '../parts/MobileDrawer';
import SupportNavbar from '../parts/AboveAppBar';
import BelowAppBar from '../parts/BelowAppBar';

import { categoryAPI } from '../../../api/api';
import globalVariables from '../../../global-variables';

const logo = 'logo-ar.png';

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
    categories: [
      {
        title: 'قمد',
//        subtitle: 'افضل منتجات القمد',
        slug: '#',
        links: {
          'ع الموضة': {
            'افشخنات': '#1',
            'كلوتات': '#2'
          },
          'كلاسيك': {
            'افشخنات': '#1',
            'كلوتات': '#2'
          },
        }
      },
    ]
  }

  componentDidMount(){
    categoryAPI.get('/')
    .then(res => {
        let { categories } = this.state;
        let cats = res.data[0].children;
        console.log(cats)
        for(let cat of cats){
          console.log(cat.name);
          const sublinks = []
          for(let subcat of cat.children){
            console.log(subcat.name);
            sublinks.push(subcat.name);
          }
          categories.push({
            title: cat.name,
            subtitle: cat.name,
            slug: cat.slug,
            links: {
              'عنوان': sublinks,
            }
          })
        }
        this.setState({
          categories: categories,
        })
    })
    .catch(res => {
        console.log(res)
    })
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
        <BelowAppBar links={this.state.categories}/>
      </React.Fragment>
    );
  }
}

export default Navbar;
