export default theme => ({
    root: {
        backgroundColor: 'darkgreen',
        alignItems: 'center',
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        flex: '1 0 15%',
        //[theme.breakpoints.down('sm')]: {
        //flex: '1 0 15%',
        //}
    },
    appBarLink: {
        fontFamily: "'Droid Arabic Kufi', 'Roboto'",
        fontSize: '24px',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        color: 'white',
        transition: theme.transitions.create(['margin'], { duration: '0.3s' }),
        '&:hover': {
            cursor: 'pointer',
            color: 'pink',
            textDecoration: 'none',
        }
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'inherit',
    },
    searchBar: {
        flex: '1 0 calc(100% - 220px - 15%)',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            flex: '1 0 calc(60% - 10px)',
        },
    },
    sectionDesktop: {
        flex: '1 0 220px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    sectionMobile: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flex: '1 0 1%',
            justifyContent: 'flex-end',
        },
    },
    grow: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none'
    },
    menuItem: {
        textAlign: 'inherit',
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
});