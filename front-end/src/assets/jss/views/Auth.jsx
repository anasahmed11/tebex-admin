export const styles = theme => ({
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
    paper: {
        position: 'absolute',
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
      },
 
});