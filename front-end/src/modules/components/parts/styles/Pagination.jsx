export default theme => ({
    root:{
        borderRadius:'0',
        flex:'1 1 auto',
        "&:hover":{
            backgroundColor:'#FF6B6B',
        },
        
    },
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


