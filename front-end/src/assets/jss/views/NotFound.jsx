export default (theme) => ({
    root: {
        padding: `${theme.spacing(12)}px 0px`,
        minHeight: '500px',
        position:'relative',
        textAlign:'center',
    },

    paddingTop:{
        padding:'20px 0px'
    },
    button:{
        '&:hover': {
            textDecoration: 'underline'
        }
    }
});