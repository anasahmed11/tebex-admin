export default theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid transparent',
    cursor: 'pointer',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: '0px 0px 1px 0px',
    flexBasis: 'calc(25% - 50px)',
    transition: 'background-color 0.3s ease-in-out',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      flexBasis: '100%'
    },
    '&:hover': {
      backgroundColor: '#fefafa',
    },
  
    
  },
  title: {
    fontSize: 14,
  },
  row: {
    display: 'flex',
  },
  rowKey: {
    flex: '1 0 25%',
    fontWeight: 'bold',
  },
  rowVal: {
    flex: '1 0 75%',
  },
  addressContainer: {
    height: '100%',
  },
  deleteIcon: {
    position: 'absolute',
    top: '-12px',
    left: '-12px',
    backgroundColor: 'white',
    transitionProperty: 'transform, color',
    '&:hover': {
      color: 'darkred',
      transform: 'scale(1.2,1.2)',
    },
  }
});