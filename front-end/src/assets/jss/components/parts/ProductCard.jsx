import globalVariables from '../../../../global-variables';

export default (theme) => ({
    card: {
      direction: globalVariables.LANG === 'en'? 'rtl' : 'ltr',
      height: '100%',
      transform: 'scale(0.95)',
      border: '1px solid #eee',
      transition: '0.3s',
      boxShadow: '0px 0px 0px 0px',
      '&:hover': {
          // transform: 'scale(1)',
          boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
          '& $button': {
            opacity: 1,
            top: 0,
          },
          '& $priceDiv': {
            top: 0,
          }
      },
      minHeight: 340,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    media: {
      height: 200,
      backgroundSize: 'contain',
    },
    actions: {
    },
    priceDiv: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
      position: 'relative',
      top: 40,
      transition: 'all 0.4s ease'
    },
    price: {
      color: 'blue',
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
    button: {
      opacity: 0,
      top: 20,
      transition: 'all 0.4s ease'
    }
  });