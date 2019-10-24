import palette from "../../../site-colors";

export default theme => ({
    padding: {
        padding: `%{theme.spacing(2)}px 0px`,
    },
    margin: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    deleteIcon: {
        position: 'absolute',
        top: '-12px',
        left: '-12px',

        transitionProperty: 'transform, color',
        '&:hover': {
            color: palette.second,
            transform: 'scale(1.2,1.2)',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
});