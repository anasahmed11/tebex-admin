export default theme => ({
    root: {
        backgroundColor: 'white ',
        padding: `${theme.spacing(4)}px 0px`,
    },
    menuItem: {
        textAlign:'inherit',
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary:{
        padding:'0px',
    },
    nested: {
        paddingLeft: theme.spacing(4),
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    icon: {},
    fontawesomeIcon: {
        width:'24px !important',
        height: '24px'
    },
    textHead:{
        fontWeight:'500'
    },
    link:{
        textDecoration:'none',
        color: 'rgba(0, 0, 0, 0.87)',
        padding: '0px'
    },

    settingsMenu: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    iconImage: {
        width: '1em',
        fontSize: '24px',
    }
});