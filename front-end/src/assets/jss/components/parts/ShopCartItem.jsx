import palette from "../../../site-colors";

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
        objectFit: 'contain',
    },
    textSection:{
        fontWeight:'500',
        fontSize:'13px',
        color: palette.darkgray,
    },
    menu: {
        width: '60px',
        margin: '0px 4px 10px 0px'
    },
    cleanLink: {
        textDecoration: 'none',
        color: palette.blue,
    },
    returnButton: {
        fontSize: 12,
    },
    returnInfo: {
        fontSize: 12,
        color: palette.second
    },
});