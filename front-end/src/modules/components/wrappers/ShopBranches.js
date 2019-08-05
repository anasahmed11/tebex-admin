import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

import LinedTitle from '../parts/TwoLinesSectionTitle';
import ShopStoreCards from '../parts/LargeCards'

import { storesAPI as axios } from '../../../api/api';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(6),
        justifyContent:'center',
        backgroundColor: '#1E3953',
    }, 
});


class ButtonBases extends Component {
    state = {
        display:false,
        stores : [
            {
              url: 'https://lp2.hm.com/hmgoepprod?set=width[304],quality[80],options[limit]&source=url[https://www2.hm.com/content/dam/TOOLBOX/PRE_SEASON/2018_s8/w37/app-download-S8-2x3.jpg]&scale=width[global.width],height[15000],options[global.options]&sink=format[jpg],quality[global.quality]',
              link: 'https://www.google.com',
              name: 'تجريبي',           
            },
          ],
    };

    componentDidMount(){
      axios.get('/')
      .then(res => {
          const { stores } = this.state;
          for (let item of res.data){
            stores.push({
              url: item.image,
              link: item.slug,
              name: item.name,
            });
          }
          this.setState({
            stores: stores,
          })
      })
      .catch(res => {
          console.log(res)
      })
      
  }

    render(){
        const { classes } = this.props;
        const { stores } = this.state;
        return (
            <div className={classes.root}>
                <LinedTitle>
                    اكتشف فروعنا
                </LinedTitle>
                <ShopStoreCards items={stores}/>
            </div>
        );
    }
}


export default withStyles(styles)(ButtonBases);