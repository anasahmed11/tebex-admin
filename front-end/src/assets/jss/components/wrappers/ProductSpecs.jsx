export default theme => ({
    root: {
      textAlign: 'initial',
    },
    ndRoot:{
        width:'100%',
        minHeight:'200px',
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
    },
    priceDiv: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1),
        position: 'relative',
        transition: 'all 0.4s ease'
      },
      price: {
        color: 'darkblue',
        fontSize:'24px',        
      },
      oldPriceDiv: {
        display: 'flex',
      },
      oldPrice: {
        color: 'gray',
        textDecorationLine: 'line-through',
        marginRight: theme.spacing(1),
      },
      discount: {
        padding: '2px 4px 2px 4px',
        marginRight: theme.spacing(1),
        marginTop: '2px',
        height: 'fit-content',
        border: '1px solid #eded2c',
        borderRadius: '2px',
        background: 'yellow',
        fontWeight: 'bold',
        fontSize: '10px',
      },
});