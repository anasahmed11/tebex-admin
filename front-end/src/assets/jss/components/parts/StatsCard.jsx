export default theme => ({
    card: {
        marginBottom: theme.spacing(2),
        flexGrow: 1,
        margin: '10px',
        flexBasis: 'calc(25% - 15px)',
        [theme.breakpoints.down('md')]: {
            flexBasis: 'calc(50% - 15px)'
        },
        [theme.breakpoints.down('xs')]: {
            flexBasis: '100%'
        },
    },
    currency: {
        fontSize: 14,
    },
});