import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { Waypoint } from 'react-waypoint';
import uuid from 'uuid';

import InfoItem from '../parts/TextSection';
import LinedTitle from '../parts/TwoLinesSectionTitle';
import BackgroundImage from '../parts/BackgroundImage';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import './styles/CompanyInfo.css';

const styles = theme => ({
    root:{
        textAlign:'center'
    },
    sndroot: {
        display: 'flex',
        width: '100%',
        height: '0px',
        transform: 'translate(0,-500px)',
        color: 'white',
        fontWeight:'300',
        fontSize:'x-large',
        [theme.breakpoints.down('sm')]: {    
            transform: 'translate(0,-850px)',
        },    
    },
    item:{
        padding: `${theme.spacing.unit*4}px`,
    }
});

const info1 = {
    title:'نبذة عن الشركة',
    description:`هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا
    بافضل خدمة وافضل الاسعار
    شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى 
    حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب
    ويمكنكم زيارة فروعنا في محافظات كذا وكذا`,
    image:'https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Company-512.png',
}
const info2 = {
    title:'نبذة عن الشركة',
    description:`هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا
    بافضل خدمة وافضل الاسعار
    شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى 
    حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب
    ويمكنكم زيارة فروعنا في محافظات كذا وكذا`,
    image:'https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Company-512.png',
}

class CompanyInfo extends React.Component {
    state = {
        display: 0,
    };

    _handleWaypointEnter = () =>{
        
        const display=this.state.display;
        console.log(display);
        this.setState({display:display+1});
    }

    render(){
        const {classes} = this.props;

        return (
            <Grid container justify='center' alignItems='center' className={classes.root} >
                <BackgroundImage 
                    img='https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/0cbolvj/flat-animated-background_efhiwxm0l__F0000.png'
                    heightL='500px'
                    heightSM='850px'
                    blur='5px'
                />
                <Grid justify="center" alignItems='center' container spacing={16} className={classes.sndroot}>
                    <LinedTitle>
                        بلاب بلاب
                    </LinedTitle>
                    <Waypoint onEnter={this._handleWaypointEnter} />
                    <ReactCSSTransitionGroup 
                        component={Grid} 
                        item 
                        xs={12} 
                        md={6} 
                        className={classes.item}
                        transitionName="info"
                        transitionEnterTimeout={2000}
                        transitionLeaveTimeout={2000}
                        transitionLeave={false}
                        transitionEnter={this.state.display===1}
                    >
                        <InfoItem image={info1.image} title={info1.title} description={info1.description} key={uuid()} />
                    </ReactCSSTransitionGroup>

                    <ReactCSSTransitionGroup 
                        component={Grid} 
                        item 
                        xs={12} 
                        md={6} 
                        className={classes.item}
                        transitionName="info"
                        transitionEnterTimeout={2000}
                        transitionLeaveTimeout={2000}
                        transitionLeave={false}
                        transitionEnter={this.state.display===1}
                    >
                        <InfoItem image={info2.image} title={info2.title} description={info2.description} key={uuid()} />
                    </ReactCSSTransitionGroup>
                    
                    
                </Grid>
            </Grid>
        );


    }
}


export default withStyles(styles)(CompanyInfo);