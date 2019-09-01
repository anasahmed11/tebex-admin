export default theme => ({
    root: {
        padding: `${theme.spacing(4)}px 0px`,
        textAlign: 'center',
        alignItems: 'center',
        position:'relative'
    },
    
    dividerWord:{
        position:'absolute',
        height:'100px',
        lineHeight:'100px',
        backgroundColor:'white',
        zIndex:'100'
    },
    dividerLine:{
        position:'absolute',
        height:'400px',
        borderLeft:'1px solid black'
    },  
    sweetLoading:{
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex:' 1000',
    },
    spinner:{
        display: 'block',
        margin: '0 auto',
        top: '50%',
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
    },
    title: {
        margin: '20px 0px 60px 0px',
    }
 
});