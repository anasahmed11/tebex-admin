import palette from "../../../site-colors";

export default theme => ({  
    root:{
        minHeight: '100px'
    },
    img:{
        height: "60px",
    },
    content:{
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: "20px",
        padding: "30px",
    },
    title:{
        color: palette.second,
    },
    description:{
        color: "white",
        height: "110px",
        [theme.breakpoints.down('sm')]: {    
            height: '125px',
        },    
    }
});