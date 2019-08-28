export default theme => ({
  root: {
    textAlign: 'initial',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: theme.spacing(0.5),
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  section: {
    marginBottom: theme.spacing(1),
    display: 'table',
    '& p': {
      display: 'table-row',
      textAlign: 'start',
    },
    '& p span': {
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'left',
      paddingRight: theme.spacing(2),
    },
    '& p span:firstChild': {
      fontSize: 14,
      color: 'gray',
    }
  },
  seller: {
    fontSize: 16,
    color: 'blue',
  },
  oldPrice: {
    fontSize: 16,
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'blue',
  },
  saving: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'navy',
  },
  specsTitle: {
    textAlign: 'left',
    marginBottom: theme.spacing(0.5),
    // fontSize: 16,
    // fontWeight: 'bold',
  },
  specName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  specButton: {
    display: 'inline-block !important',
    cursor: 'pointer',
    fontSize: 14,
    border: '1px solid #0d2f80',
    borderRadius: '2px',
    color: '#0d2f80',
    textAlign: 'center !important',
    padding: '4px 16px !important',
    margin: 2,
    '&:hover': {
      background: '#f6f0ff',
    }
  },
  specButtonActive: {
    display: 'inline-block !important',
    cursor: 'auto',
    fontWeight: 'bold',
    fontSize: 14,
    border: '1px solid black',
    borderRadius: '2px',
    color: 'black',
    textAlign: 'center !important',
    padding: '4px 16px !important',
    margin: 2,
  },
  productDesc: {
    fontSize: 16,
    textAlign: 'left',
  }
});

/*
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
*/