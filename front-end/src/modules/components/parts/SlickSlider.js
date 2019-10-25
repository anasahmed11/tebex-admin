import React from "react";
import Slider from "react-slick";
//import 'slick-carousel/slick/slick-theme.css';
//import 'slick-carousel/slick/slick.css';
import { withStyles } from "@material-ui/core";

const SlickSlider = props => {

    const arrowStyles = {
        arrow: {
            '&:before': {
                color: `${props.arrowColor} !important`,
                fontSize: '35px !important',
            }
        }
    }
    
    const Arrow = withStyles(arrowStyles)((props) => {
        const { className, style, onClick, classes } = props;
        return (
            <div
            className={className + ' ' + classes.arrow}
            style={{ ...style, display: props.display}}
            onClick={onClick}
            />
        );
    })
    
    let slickSettings = props.squares? {
        dots: true,
        infinite: false,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 6000,
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 0,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        pauseOnHover: true,
        variableWidth: props.variableWidth,
        responsive: [
            {
            breakpoint: 1400,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
            breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                }
            },
            {
            breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
            breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: false
                }
            },
            {
            breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: <Arrow display='none' />,
                    prevArrow: <Arrow display='none' />,
                    dots: false
                }
            }
        ]
    }
    :
    {
        dots: false,
        infinite: false,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 6000,
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 0,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        pauseOnHover: true,
        variableWidth: props.variableWidth,
        responsive: [
            {
            breakpoint: 1300,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
            breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                }
            },
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
                    initialSlide: 2,
                    dots: true
                }
            },
            {
            breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: <Arrow display='none' />,
                    prevArrow: <Arrow display='none' />,
                    dots: true
                }
            }
        ]
    }


    return(
        <div className={props.className}>
            <Slider {...slickSettings}>
                {props.children}
            </Slider>
        </div>
    );
}
// SlickSlider.propTypes = {
// classes: PropTypes.object.isRequired,
// };

export default SlickSlider;
