import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import { Waypoint } from 'react-waypoint';

import BackgroundImage from '../parts/BackgroundImage';
import './styles/LinksMenu.css';
import uuid from 'uuid';

const styles = theme => ({
   
    sndroot: {
        display: 'flex',
        width: '100%',
        height: '0px',
        transform: 'translate(0,-120px)',
        color: 'white',
        fontWeight:'300',
        fontSize:'x-large',
        [theme.breakpoints.down('sm')]: {    
            transform: 'translate(0,-320px)',
        },
        
    },

    gridItem: {
        position: 'relative',
        textAlign: 'center',
        lineHeight: '100px',
        height:'100px',
        transition: '0.3s',
        '&:hover':{
            background: 'rgba(255,255,255,0.2)',
            cursor: 'pointer',
        },
        '&:nth-child(2)':{
            border:'none',
            borderRight:'1pt solid white',
            borderLeft:'1pt solid white',
        },
        [theme.breakpoints.down('sm')]: {    
            '&:nth-child(2)':{
                border:'none',
                borderTop:'1pt solid white',
                borderBottom:'1pt solid white',
            },
        },
       
    },

    typo: {
        color: 'white',
        marginTop: theme.spacing.unit * 3,
        transition: '0.5s',
        width: '50%',
        margin: '5% auto',
        '&:hover': {
            transform: 'scale(1.2)',
        }
    }
});


class LinksMenu extends React.Component{
    state = {
        display: 0,
    };
    
    _handleWaypointEnter = () =>{
        const display=this.state.display;
        this.setState({display:display+1});
    }
    

    render(){
        const { classes } = this.props;

        return (
            <Grid container >
                <Waypoint onEnter={this._handleWaypointEnter} />
                <BackgroundImage 
                    img='http://hdwpro.com/wp-content/uploads/2016/10/Wonderful-City-Wallpaper.jpg'
                    blur={'2px'}
                    heightSM="300px"
                    heightL="120px"
                />
                <ReactCSSTransitionGroup 
                    component={Grid} 
                    container 
                    className={classes.sndroot} 
                    justify="center"
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    transitionLeave={this.state.display===1}
                    transitionEnter={this.state.display===1}
                >
                    <Grid item className={classes.gridItem} xs={12} sm={12} md={3} key={uuid()}>
                        <Typography variant="h4" className={classes.typo}>
                            منتجاتنا
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} xs={12} sm={12} md={3} key={uuid()}>
                        <Typography variant="h4" className={classes.typo}>
                            فرصتك
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} xs={12} sm={12} md={3} key={uuid()}>
                        <Typography variant="h4" className={classes.typo}>
                            بلانك
                        </Typography>
                    </Grid>
                </ReactCSSTransitionGroup>        
                    
            </Grid>
        );
    }
}    

export default withStyles(styles)(LinksMenu);