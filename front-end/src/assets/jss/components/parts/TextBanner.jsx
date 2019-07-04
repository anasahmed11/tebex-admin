export const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 20,
        backgroundColor: 'lightblue',
    },
    banner: {
        borderRadius: '0px'
    },
    text: {
        [theme.breakpoints.down("xs")]: {
            fontSize: 30
        }
    }
})