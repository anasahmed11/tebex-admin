export default theme => ({
    root:{    
        backgroundColor:'inherit'
    },
    productImage:{
        border: "1px solid  #EEE",
        position: "relative"
    },
    productImages:{
        width:'80px',
        border: "1px solid #EEE",
        height: '100px',
        objectFit: 'contain',
        cursor: 'pointer',
        '&:hover': {
            opacity: '0.6',
        }
    },
    activeImage:{
        border: "1px solid #999",
        width:'80px',
        height: '100px',
        objectFit: 'contain'
    },
    slider:{
        position:'absolute',
        top:'calc(50% - 28px / 2)',
    },
    imagesParent:{
        [theme.breakpoints.down('md')]: {
            maxWidth:'100%'
          },
    }
});