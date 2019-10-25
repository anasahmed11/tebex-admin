import palette from "../../../site-colors";

// import COLORS from '../../../site-colors';

export default theme => ({
    make3Dspace: {
        textAlign: 'left',
        // position: 'relative',
        // perspective: '800px',
        // width: '340px',
        // height: '500px',
        transformStyle: 'preserve-3d',
        transition: 'transform 5s',
        // marginLeft: '-167px',
    },
    productFront: {
        // width: '335px',
        height: '500px',
        // background: palette.white,
        // position: 'absolute',
        // left: '-5px',
        // top: '-5px',
        "-webkit-transition": 'all 180ms ease-out',
           "-moz-transition": 'all 180ms ease-out',
             "-o-transition": 'all 180ms ease-out',
                transition: 'all 180ms ease-out',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    productImage: {
        // position: 'absolute',
        height: '342px',
        zIndex: '-100',
    },
    productCard: {
        // width: '325px',
        height: '490px',
        boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.3)',
        // position: 'absolute',
        // top: '10px',
        // left: '10px',
        overflow: 'hidden',
        transform: 'scale(0.95)',
        transformStyle: 'preserve-3d',
        "-webkit-transition": ' 180ms ease-out',
           "-moz-transition": ' 180ms ease-out',
             "-o-transition": ' 180ms ease-out',
                transition: ' 180ms ease-out',
        '&:hover $productFront': {
            top: '0px',
            left: '0px',
            "-webkit-transition": 'all 180ms ease-out',
            "-moz-transition": 'all 180ms ease-out',
                "-o-transition": 'all 180ms ease-out',
                    transition: 'all 180ms ease-out',
        },
        '&:hover': {
            // top: '5px',
            // left: '5px',
            // width: '335px',
            // height: '500px',
            boxShadow: '0px 13px 21px -5px rgba(0, 0, 0, 0.3)',
            "-webkit-transition": ' 180ms ease-out',
               "-moz-transition": ' 180ms ease-out',
                 "-o-transition": ' 180ms ease-out',
                    transition: ' 180ms ease-out',
        },
        '&:hover $statsContainer': {
            top: '278px',
            "-webkit-transition": 'all 300ms ease-out',
            "-moz-transition": 'all 300ms ease-out',
                "-o-transition": 'all 300ms ease-out',
                    transition: 'all 300ms ease-out',
        },
        '&:hover $imageOverlay': {
            opacity: '0.7',
            "-webkit-transition": 'all 300ms ease-out',
            "-moz-transition": 'all 300ms ease-out',
                "-o-transition": 'all 300ms ease-out',
                    transition: 'all 300ms ease-out',
        },
        '&:hover $viewDetails': {
            opacity: '1',
            width: '152px',
            fontSize: '15px',
            marginLeft: '-75px',
            top: '115px',
            "-webkit-transition": 'all 300ms ease-out',
               "-moz-transition": 'all 300ms ease-out',
                 "-o-transition": 'all 300ms ease-out',
                    transition: 'all 300ms ease-out',
        },
    },
    statsContainer: {
        background: palette.white,
        position: 'absolute', // position: 'absolute',
        top: '342px',
        left: '0',
        right: '0',
        // width: '265px',
        height: '300px',
        padding: '7px 35px 35px', // padding: '27px 35px 35px',
        "-webkit-transition": 'all 300ms ease-out',
           "-moz-transition": 'all 300ms ease-out',
             "-o-transition": 'all 300ms ease-out',
                transition: 'all 300ms ease-out',
        '& p': {
            fontSize: '16px',
            color: palette.darkgray,
            padding: '2px 0 20px 0',
        },
    },
    productBrand: {
        fontSize: '16px',
        color: palette.darkgray,
        height: '22px',
    },
    productName: {
        fontSize: '22px',
        color: palette.dark,
        height: '64px',
        lineHeight: '1.4',
        display: '-webkit-box',
        overflow: 'hidden',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
    },
    productPrice: {
        // float: 'right',
        color: palette.blue, // color: '#48cfad',
        fontSize: '22px',
        fontWeight: '600',
    },
    imageOverlay: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: palette.first, // background: '#48daa1',
        opacity: '0',
    },
    productOptions: {
        padding: '2px 0 0',
        '& strong': {
            fontWeight: '700',
            color: palette.dark,
            fontSize: '14px',
        },
        '& span': {
            color: palette.darkgray,
            fontSize: '14px',
            display: 'block',
            marginBottom: '8px',
        }
    },
    viewDetails: {	
        position: 'absolute',
        top: '112px',
        left: '50%',
        marginLeft: '-85px',
        border: `2px solid ${palette.white}`,
        color: palette.white,
        fontSize: '19px',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '700',
        padding: '10px 0',
        width: '172px',
        opacity: '0',
        "-webkit-transition": 'all 300ms ease-out',
           "-moz-transition": 'all 300ms ease-out',
             "-o-transition": 'all 300ms ease-out',
                transition: 'all 300ms ease-out',
        '&:hover': {
            background: palette.white,
            color: palette.first, // color: '#48cfad',
            cursor: 'pointer',
        }
    },
    addToCart: {
        margin: 'auto',
        border: `2px solid ${palette.first}`,
        color: palette.first,
        fontSize: '19px',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginTop: '8px',
        padding: '6px 0',
        width: '100%',
        "-webkit-transition": 'all 300ms ease-out',
           "-moz-transition": 'all 300ms ease-out',
             "-o-transition": 'all 300ms ease-out',
                transition: 'all 300ms ease-out',
        '&:hover': {
            background: `${palette.first} radial-gradient(circle, transparent 1%, ${palette.first} 1%) center/15000%;`,
            color: palette.white,
            cursor: 'pointer',
        },
        '&:active': {
            backgroundColor: palette.blue,
            backgroundSize: '100%',
            transition: 'background 0s',
        }
    },
    shadow: {
        width: '100%', // width: '335px',
        height: '100%', // height: '520px',
        opacity: '0',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '3',
        display: 'none',
        background: 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
    },
    discount: {
        position: 'absolute',
        left: '12px',
        top: 0,
        color: palette.white,
        background: palette.second,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '700',
        lineHeight: '1.2',
        padding: '14px 4px 7px 4px',
        // borderBottomLeftRadius: '35px',
        // borderBottomRightRadius: '35px',
        width: '50px',
    },
    productOldPrice: {
        fontSize: '16px',
        height: '16px',
        color: palette.darkgray,
        textDecorationLine: 'line-through',
    },
    loading: {
        position: 'absolute',
        top: '25%',
        zIndex: '-999',
    },
    link: {
        textDecorationLine: 'none'
    },


    // STYLES FOR SLICK-SLIDER

    make3DspaceSlider: {
        textAlign: 'left',
        width: '203px',
        height: '380px',
        // position: 'relative',
        // perspective: '800px',
        // width: '340px',
        // height: '500px',
        transformStyle: 'preserve-3d',
        transition: 'transform 5s',
        // marginLeft: '-167px',
    },
    productFrontSlider: {
        // width: '335px',
        height: '380px',
        // background: palette.white,
        // position: 'absolute',
        // left: '-5px',
        // top: '-5px',
        "-webkit-transition": 'all 180ms ease-out',
           "-moz-transition": 'all 180ms ease-out',
             "-o-transition": 'all 180ms ease-out',
                transition: 'all 180ms ease-out',
    },
    productCardSlider: {
        // width: '325px',
        height: '390px',
        boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.3)',
        // position: 'absolute',
        // top: '10px',
        // left: '10px',
        overflow: 'hidden',
        transform: 'scale(0.95)',
        transformStyle: 'preserve-3d',
        "-webkit-transition": ' 180ms ease-out',
           "-moz-transition": ' 180ms ease-out',
             "-o-transition": ' 180ms ease-out',
                transition: ' 180ms ease-out',
        '&:hover $productFrontSlider': {
            top: '0px',
            left: '0px',
            "-webkit-transition": 'all 180ms ease-out',
            "-moz-transition": 'all 180ms ease-out',
                "-o-transition": 'all 180ms ease-out',
                    transition: 'all 180ms ease-out',
        },
        '&:hover': {
            // top: '5px',
            // left: '5px',
            // width: '335px',
            // height: '500px',
            boxShadow: '0px 13px 8px -9px rgba(0, 0, 0, 0.3)',
            "-webkit-transition": ' 180ms ease-out',
               "-moz-transition": ' 180ms ease-out',
                 "-o-transition": ' 180ms ease-out',
                    transition: ' 180ms ease-out',
        },
        '&:hover $statsContainerSlider': {
            top: '230px',
            "-webkit-transition": 'all 300ms ease-out',
            "-moz-transition": 'all 300ms ease-out',
                "-o-transition": 'all 300ms ease-out',
                    transition: 'all 300ms ease-out',
        },
        '&:hover $imageOverlay': {
            opacity: '0.7',
            "-webkit-transition": 'all 300ms ease-out',
            "-moz-transition": 'all 300ms ease-out',
                "-o-transition": 'all 300ms ease-out',
                    transition: 'all 300ms ease-out',
        },
        '&:hover $viewDetailsSlider': {
            opacity: '1',
            width: '152px',
            fontSize: '15px',
            marginLeft: '-75px',
            top: '115px',
            "-webkit-transition": 'all 300ms ease-out',
               "-moz-transition": 'all 300ms ease-out',
                 "-o-transition": 'all 300ms ease-out',
                    transition: 'all 300ms ease-out',
        },
    },
    productImageSlider: {
        // position: 'absolute',
        height: '284px',
        zIndex: '-100',
    },
    statsContainerSlider: {
        background: palette.white,
        position: 'absolute', // position: 'absolute',
        top: '284px',
        right: '0',
        left: '0',
        // width: '265px',
        height: '300px',
        padding: '7px 35px 35px', // padding: '27px 35px 35px',
        "-webkit-transition": 'all 300ms ease-out',
           "-moz-transition": 'all 300ms ease-out',
             "-o-transition": 'all 300ms ease-out',
                transition: 'all 300ms ease-out',
        '& p': {
            fontSize: '16px',
            color: palette.darkgray,
            padding: '2px 0 20px 0',
        },
    },
    productBrandSlider: {
        fontSize: '12px',
        color: palette.darkgray,
        height: '15px',
    },
    productNameSlider: {
        fontSize: '14px',
        color: palette.dark,
        height: '40px',
        lineHeight: '1.4',
        display: '-webkit-box',
        overflow: 'hidden',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
    },
    productPriceSlider: {
        // float: 'right',
        color: palette.first, // color: '#48cfad',
        fontSize: '16px',
        fontWeight: '600',
    },
    viewDetailsSlider: {	
        position: 'absolute',
        top: '112px',
        left: '50%',
        marginLeft: '-85px',
        border: `2px solid ${palette.white}`,
        color: palette.white,
        fontSize: '15px',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '700',
        padding: '8px 0',
        width: '172px',
        opacity: '0',
        "-webkit-transition": 'all 300ms ease-out',
           "-moz-transition": 'all 300ms ease-out',
             "-o-transition": 'all 300ms ease-out',
                transition: 'all 300ms ease-out',
        '&:hover': {
            background: palette.white,
            color: palette.first, // color: '#48cfad',
            cursor: 'pointer',
        }
    },
    discountSlider: {
        position: 'absolute',
        top: 0,
        fontSize: '18px',
        left: '12px',
        color: palette.white,
        background: palette.second,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '700',
        lineHeight: '1.2',
        padding: '10px 2px 6px 2px',
        // borderBottomLeftRadius: '35px',
        // borderBottomRightRadius: '35px',
        width: '50px',
    },
    addToCartSlider: {
        margin: 'auto',
        border: `2px solid ${palette.first}`,
        color: palette.first,
        fontSize: '16px',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginTop: '4px',
        padding: '6px 0',
        width: '100%',
        "-webkit-transition": 'all 300ms ease-out',
           "-moz-transition": 'all 300ms ease-out',
             "-o-transition": 'all 300ms ease-out',
                transition: 'all 300ms ease-out',
        '&:hover': {
            background: `${palette.first} radial-gradient(circle, transparent 1%, ${palette.first} 1%) center/15000%;`,
            color: palette.white,
            cursor: 'pointer',
        },
        '&:active': {
            backgroundColor: palette.gray,
            backgroundSize: '100%',
            transition: 'background 0s',
        }
    },
    productOldPriceSlider: {
        fontSize: '13px',
        height: '15px',
        color: palette.darkgray,
        textDecorationLine: 'line-through',
    },
    outOfStock: {
        background: 'rgba(150, 150, 150, 0.4)',
        zIndex: 10,
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
});