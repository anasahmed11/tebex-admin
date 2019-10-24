import palette from "../../../site-colors";

export default theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(6),
        justifyContent:'center',
        backgroundColor: palette.first,
    }, 
});