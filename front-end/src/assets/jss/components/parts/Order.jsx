export default theme => ({
    root: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
    textHead: {
        fontWeight: '500'
    },
    textSection: {
        fontWeight: '500',
        fontSize: '13px',
        color: 'rgb(100,100,100)',
    },
    orderInfoSection: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(1),
    },
    orderInfoItem: {
        flex: '1 0 50%',
        [theme.breakpoints.down('sm')]: {
            flex: '1 0 100%',
        }
    },
});