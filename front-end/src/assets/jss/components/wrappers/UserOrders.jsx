import palette from "../../../site-colors";

export default theme => ({
    searchRoot: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    
    root: {
        backgroundColor: palette.white,
        padding: `${theme.spacing(4)}px 0px`,
    },
    textHead: {
        fontWeight: '500',
        marginBottom: theme.spacing(4),
    },
    image: {
        width: '50%',
        maxHeight: '200px',
    },
    textSection: {
        fontWeight: '500',
        fontSize: '13px',
        color: 'rgb(100,100,100)',
    },

    textPrimary: {
        color: `${palette.white} !important`
    },
    label:{
        whiteSpace: 'nowrap',
    },
    disabled:{
        whiteSpace: 'nowrap',
        color: palette.white,
    },
    rootCurrent:{
        borderRadius:'0',
        backgroundColor: palette.second,
        flex: '1 1 auto',
        "&:hover": {
            backgroundColor: palette.second,
        },
    }
});


