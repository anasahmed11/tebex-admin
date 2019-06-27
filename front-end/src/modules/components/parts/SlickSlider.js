import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    sliderLayout: {
        width: '80%',
        margin: 'auto'
    }
});
  
function Arrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: props.display, color: 'white'}}
        onClick={onClick}
        />
    );
}
  

var slickSettings = {
    dots: true,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    pauseOnHover: true,
    responsive: [
        {
        breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
        breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
        breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                nextArrow: <Arrow display='none' />,
                prevArrow: <Arrow display='none' />,
            }
        }
    ]
}

function SlickSlider(props){
    
    const { classes } = props;

    return(
        <div className={classes.sliderLayout}>
            <Slider {...slickSettings}>
                {props.children}
            </Slider>
        </div>
    );
}
SlickSlider.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SlickSlider);
