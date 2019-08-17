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