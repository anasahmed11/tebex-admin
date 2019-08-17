export default theme => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    input: {
        flex: 1,
        margin: theme.spacing(1),
    },

    iconButton: {
    },
    oneLineTextDisplay: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
});