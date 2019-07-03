import React from 'react';
import 'typeface-roboto';
import {withStyles, Grid, Typography } from '@material-ui/core';
import Magnifier from 'react-magnifier'; 
import uuid from 'uuid';
import {ArrowForwardIos, ArrowBackIos} from '@material-ui/icons';

const styles = theme => ({
    root:{    
        backgroundColor:'inherit'
    },
    productImage:{
        border: "1px solid  #EEE",
        position: "relative"
    },
    productImages:{
        width:'50px',
        border: "1px solid #EEE"
    },
    activeImage:{
        border: "1px solid #999",
        width:'50px'
    },
    slider:{
        position:'absolute',
        top:'50%',
    },
    imagesParent:{
        maxWidth:'50px',
        [theme.breakpoints.down('md')]: {
            maxWidth:'100%'
          },
    }
});

class ProducViewer extends React.Component{
    state = {
        selectedImage:0,
        
    }

    handleClickedImage = (idx) => {
        this.setState({selectedImage:idx,
                        resetTimeOut:true});
    }

    handleSliding = (value,len) => {
        
        var selectedImage = this.state.selectedImage;
        selectedImage = (selectedImage+value+ len)%len ;
        this.setState({selectedImage:selectedImage});
    
    }
    render() {
        const {selectedImage  } = this.state;
        const {classes, images, title } = this.props;
        const len =images.length;
        return (
            <Grid container justify='center' className={classes.root}>
                    
                <Grid item xs={12}>
                    <Typography component="h6" variant="h6" gutterBottom>{title}</Typography>
                </Grid>
                <Grid item md={2} xs={12} className={classes.imagesParent}> 
                    {
                        images.map((img,idx) => 
                            <img src={img}
                                className={idx===selectedImage? classes.activeImage:classes.productImages}
                                onClick={() => this.handleClickedImage(idx)}
                                key={uuid()}
                                alt="product"
                                />
                        )
                    }
                </Grid>
                <Grid item md={10} xs={12} className={classes.productImage}>
                <div className={classes.slider} style={{right:'2px'}} onClick={()=>this.handleSliding(1,len)}><ArrowForwardIos></ArrowForwardIos></div>
                <div className={classes.slider} style={{left:'2px'}} onClick={()=>this.handleSliding(-1,len)}><ArrowBackIos></ArrowBackIos></div>
                    <Magnifier 
                        src={images[selectedImage]} 
                        width={200}
                        zoomFactor={1.7}
                        mgWidth={150}
                        mgHeight={150} />
                
                </Grid>
                        
            </Grid>

        );
    }
}

export default withStyles(styles)(ProducViewer);