export default theme => ({
    root: {
        backgroundColor: 'white ',
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


    // root:{
    //     borderRadius:'0',
    //     flex:'1 1 auto',
    //     "&:hover":{
    //         backgroundColor:'#FF6B6B',
    //     },
        
    // },
    textPrimary: {
        color: 'white !important'
    },
    label:{
        whiteSpace: 'nowrap',
    },
    disabled:{
        whiteSpace: 'nowrap',
        color: 'white'
    },
    rootCurrent:{
        borderRadius:'0',
        backgroundColor:'#FF6B6B',
        flex:'1 1 auto',
        "&:hover":{
            backgroundColor:'#FF6B6B',
        },
    }
});


