import React from 'react';
import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import uuid from 'uuid';
import { Link } from 'react-router-dom';

const carouselData = [
    {
        img: 'https://k.nooncdn.com/cms/pages/20190816/fa34ff480c6e02fba62200e1c513bae5/en_slider-01.gif',
        link: '/shop/',
        alt: 'first img',
    },
    {
        img: 'https://k.nooncdn.com/cms/pages/20190731/9b8157db9e3810dafb704aa3d228ead8/en-slider-banner.png',
        link: '/shop/',
        alt: 'second img',
    }
]

export default (props) => 
        <div style={{direction: 'ltr'}}>
            <Carousel
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                infiniteLoop={true}
                transitionTime={1000}
            >
                {carouselData.map(item =>
                    <Link to={item.link}>
                        <div>
                            <img src={item.img} alt={item.alt} />
                        </div>
                    </Link>
                )}
            </Carousel>
        </div>