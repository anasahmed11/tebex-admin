export default theme => ({
    root: {
        backgroundColor: '#ef5347',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    linksBar: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    item: {
        marginRight: '24px',
        position: 'relative',
        paddingTop: '14px',
        paddingBottom: '14px',
        '&:hover > div': {
            visibility: 'visible',
            opacity: 1,
        }
    },
    navLink: {
        position: 'inherit',
        fontFamily: "'Droid Arabic Kufi', 'Roboto'",
        fontSize: '20px',
        transition: theme.transitions.create(),
        color: 'white',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'pink',
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '5%',
            height: '3px',
            transition: theme.transitions.create(),
            backgroundColor: 'yellow',
            marginBottom: theme.spacing(-0.5),
            opacity: 0,
        },
        '&:hover:after': {
            opacity: 1,
        },
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        position: 'absolute',
        zIndex: 10,
        right: 0,
        top: '82%',
        left:'0px',
        width: '400px',
        transition: theme.transitions.create(),
        visibility: 'hidden',
        opacity: 0,
    },
    list: {
        margin: 0,
        listStyle: 'none',
        padding: '0px 4px 0px 0px',
      },
    listItem: {
        paddingTop: theme.spacing(1), //it was theme.spacing.unit / 2
        paddingBottom: theme.spacing(1),//it was theme.spacing.unit / 2
    },
    // footer
    footer: {
        width: '80%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
        }
    },
    // footerSection
    footerSection: {
        flex: '0 0 calc(50% - 4px)',
        marginBottom: theme.spacing(2),
    },
    footerLink: {
        color: 'blue',
    }
});