export default theme => ({
    card: {
        marginBottom: theme.spacing(2),
        flexBasis: 'calc(25% - 15px)',
        [theme.breakpoints.down('md')]: {
            flexBasis: 'calc(50% - 15px)'
        },
        [theme.breakpoints.down('xs')]: {
            flexBasis: '100%'
        },
    },
    title: {
        fontSize: 14,
    },
    currency: {
        fontSize: 14,
    },
    pos: {

    },
});