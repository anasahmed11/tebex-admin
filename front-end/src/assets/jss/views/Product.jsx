export default theme => ({
    root: {
      backgroundColor: 'white ',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4),
      textAlign:'center',
      width: '100%',
      margin: '0',
    },
    loadingContainer: {
      height: '-webkit-fill-available',
      minHeight: '450px',
    },

    
  categoryTrace: {
      display: 'flex',
      flexWrap: 'wrap',
      flexGrow: 1,
      /*
      border: '1px solid grey',
      borderRadius: '4px',
      */
      margin: theme.spacing(0.5),
  },
  categoryLinkElement: {
      display: 'flex',
      fontSize: '14px',
      marginRight: theme.spacing(1),
      '&:after': {
          content: '"»"',
          marginLeft: theme.spacing(1)
      },
      '&:last-child:after': {
          content: '""',
      }
  },
  categoryLink: {
      textDecorationLine: 'none',
      color: 'grey',
      '&:hover': {
          color: 'blue',
      },
  },
});