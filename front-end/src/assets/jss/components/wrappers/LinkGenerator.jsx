export default theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        height: 'fit-content',
        flexGrow: 1,
    },
    textHead:{
        fontWeight:'500',
        marginBottom: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(1),
    },
    icon: {
        margin: theme.spacing(1),
    },
});