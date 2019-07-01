export const styles = theme => ({
    root: {
        padding: `${theme.spacing.unit * 4}px 0px`,
        minHeight:'500px',   
        position:'relative',
        backgroundColor:'rgb(0,0,0,0.01)',        
    },
    root2:{
        padding: `${theme.spacing.unit * 2}px 0px`,
        position:'relative',
        backgroundColor:'white',
    },
    root3:{
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px`,
        minHeight:'200px',
        boxShadow:' 0px 0px 30px 10px rgba(0, 0, 0, 0.06)'
    },
    checkoutButton:{
        padding: `${theme.spacing.unit * 2}px 0px`
    },
    sweetLoading:{
        textAlign:'center'
    }
});

