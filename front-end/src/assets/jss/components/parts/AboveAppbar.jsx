export default (theme) => ({
    root: {
      backgroundColor: 'black',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      }
    },
    linksBar: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    navLink: {
      fontFamily: "'Droid Arabic Kufi', 'Roboto'",
      fontSize: '14px',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      color: 'white',
      '&:hover': {
          cursor: 'pointer',
          color: 'pink',
          textDecoration: 'none',
      }
    }
  });