export default theme => ({
    root: {
        backgroundColor: 'white ',
        // padding: `${theme.spacing(4)}px 0px`,
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
    primary: {},
    icon: {},
    link:{
        textDecoration:'none'
    },
    settingsMenu: {
        width: '100%',
        marginBottom: theme.spacing(4),
    },
    avatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    avatarDiv: {
        display: 'flex',
        alignItems: 'center',
    },
   
});