export default theme => ({
    root: {
      backgroundColor: 'white ',
      padding: `${theme.spacing(4)}px 0px`,
    },
    textHead:{
        fontWeight:'500'
    },
    statsCardsRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        marginBottom: theme.spacing(2),
        flexBasis: 'calc(33% - 15px)',
        [theme.breakpoints.down('md')]: {
            flexBasis: 'calc(50% - 15px)'
        },
        [theme.breakpoints.down('xs')]: {
            flexBasis: '100%'
        },
    },
    paymentCards: {
        
        position: 'relative',
        padding: `${theme.spacing(4)}px 0px`,   
    },
    shit: {
        // backgroundColor: 'green',
        // padding: theme.spacing(2),
        '& .ct-label': { 
            color: 'blue',
        },
        '& line.ct-bar': {
            stroke: 'gray',
        }
    }
});