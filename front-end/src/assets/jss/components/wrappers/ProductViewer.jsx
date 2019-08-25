export default theme => ({
    root:{    
        backgroundColor:'inherit'
    },
    productImage:{
        border: "1px solid  #EEE",
        position: "relative"
    },
    productImages:{
        width:'50px',
        border: "1px solid #EEE",
        height: '100px',
        objectFit: 'contain'

    },
    activeImage:{
        border: "1px solid #999",
        width:'50px',
        height: '100px',
        objectFit: 'contain'
    },
    slider:{
        position:'absolute',
        top:'calc(50% - 28px / 2)',
    },
    imagesParent:{
        maxWidth:'50px',
        [theme.breakpoints.down('md')]: {
            maxWidth:'100%'
          },
    }
});