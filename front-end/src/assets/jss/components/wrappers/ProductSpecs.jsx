export default theme => ({
    root: {
      textAlign: 'initial',
    },
    ndRoot:{
       
        width:'100%',
        minHeight:'300px',
    },
    salePrice:{
        color: 'darkblue',
        fontSize: '25px',
        fontWeight: 'bold',
    },
    price:{
        textDecoration:'line-through',
        fontSize: '12px',
        color: 'gray',
    },
    priceSave:{
        fontSize: '12px',
    },
    specFont:{
        fontSize:'15px'
    },
    spec:{
        margin:"10px 0px"
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
});