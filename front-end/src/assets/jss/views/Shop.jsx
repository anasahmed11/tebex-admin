export default theme => ({
    shopComponentContainer: {
        background: 'white',
        minHeight: '400px',
        boxShadow: '0px 0px 20px 0px gray',
        marginTop: -8 * theme.spacing(1),
        marginBottom: 8 * theme.spacing(1),
        [theme.breakpoints.down("xs")]: {
            marginTop: 0,
        } 
    }
  })