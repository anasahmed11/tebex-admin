import React from 'react';
import Magnifier from 'react-magnifier';

import uuid from 'uuid';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { withStyles, Grid, Typography, IconButton } from '@material-ui/core';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';
import 'typeface-roboto';
import './styles/productViewer.css';

import styles from '../../../assets/jss/components/wrappers/ProductViewer';

class ProductViewer extends React.Component {

    state = {
        selectedImage: 0,
    }

    handleClickedImage = idx => this.setState({ selectedImage: idx, resetTimeOut: true });


    handleSliding = (value, len) => {
        let selectedImage = this.state.selectedImage;
        selectedImage = (selectedImage + value + len) % len;
        this.setState({ selectedImage: selectedImage });
    }

    render() {
        console.log('asas')
        const { selectedImage } = this.state;
        const { classes, images } = this.props;
        const len = images.length;
        return (
            <Grid container justify='center' className={classes.root}>
                
                <Grid item md={2} xs={12} className={classes.imagesParent}>
                    {images.map((img, idx) =>
                        <img src={img}
                            className={idx === selectedImage ? classes.activeImage : classes.productImages}
                            onClick={() => this.handleClickedImage(idx)}
                            key={uuid()}
                            alt="product"
                        />
                    )}
                </Grid>

                <Grid item md={10} xs={12} className={classes.productImage}>

                    <IconButton size="small" className={classes.slider} style={{ right: '0px' }} onClick={() => this.handleSliding(1, len)}>
                        <ArrowForwardIos />
                    </IconButton>
                    <IconButton size="small" className={classes.slider} style={{ left: '0px' }} onClick={() => this.handleSliding(-1, len)}>
                        <ArrowBackIos />
                    </IconButton>

                    <ReactCSSTransitionGroup 
                        transitionEnterTimeout={600}
                        transitionLeaveTimeout={600}
                        transitionName="productViewer"
                        component="div"
                        style={{
                            position: 'relative',
                            height: '350px',
                            margin: '10px 48px'}}
                        >
                        {
                            images.map((img,idx)=>{
                                if(idx === selectedImage)
                                return <Magnifier
                                            src={img}
                                            width='auto'
                                            height={350}
                                            mgShape="square"
                                            zoomFactor={1}
                                            mgWidth={240}
                                            mgHeight={300}
                                        />
                                        
                            })
                        }
                        
                    </ReactCSSTransitionGroup>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(ProductViewer);