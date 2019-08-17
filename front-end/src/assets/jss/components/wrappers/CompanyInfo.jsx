export default theme => ({
    root: {
        textAlign:'center',
        background: 'purple'
    },
    icon: {
        color: 'white',
        fontSize: '15vh',
        background: '#38c49d',
        padding: theme.spacing(1),
        marginRight: theme.spacing(2),
    },
    infoSection: {
        display: 'flex',
        marginBottom: theme.spacing(4),
    },
    infoText: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        color: 'yellow',
    },
    desc: {
        color: 'white',
    }
});