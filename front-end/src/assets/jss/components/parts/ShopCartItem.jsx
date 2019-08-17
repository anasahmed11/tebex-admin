export default  theme => ({
    root: {
        border:'1px solid rgba(0,0,0,0.1)',
        margin: `0px 0px ${theme.spacing(2)}px 0px`,
        padding: theme.spacing(1),
    },
    upperSection:{
        minHeight:'100px',
        padding:`${theme.spacing(2)}px 0px`
    },
    imageRoot:{
        textAlign:'center',
    },
    image:{
        width: '50%',
        maxHeight:'200px',
    },
    textSection:{
        fontWeight:'500',
        fontSize:'13px',
        color:'rgb(100,100,100)',
    },
   menu: {
       width: '60px',
       margin: '0px 4px 10px 0px'
   },
   cleanLink: {
       textDecoration: 'none',
       color: 'navy',
   }
});