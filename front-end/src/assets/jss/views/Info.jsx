import palette from "../../site-colors";

export default theme => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10)
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        width: '100%',
    },
    listIcon: {
        alignSelf: 'flex-start',
        color: palette.darksecond,
        marginTop: theme.spacing(1),
    },
    title: {
        color: palette.darkfirst,
    },
    textTitle: {
        fontWeight: 'bold',
        color: palette.darksecond,
    },
    text: {
        color: palette.dark,
    }
});