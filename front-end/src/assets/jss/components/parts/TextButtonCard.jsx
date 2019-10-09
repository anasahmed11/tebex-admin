export default theme => ({
    root: {
      minWidth: 'fit-content',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      padding: theme.spacing(3),
      marginBottom: theme.spacing(2),
      boxShadow: '0px 0px 1px 0px',
      flexBasis: 'calc(25% - 48px)',
      transition: 'background-color 0.3s ease-in-out',
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(2),
      },
      [theme.breakpoints.down('md')]: {
          flexBasis: '100%'
      },
      '&:hover': {
        backgroundColor: '#fefafa',
      }
    },
});