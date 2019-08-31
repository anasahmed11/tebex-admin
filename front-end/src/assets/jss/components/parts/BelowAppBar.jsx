import COLORS from '../../../site-colors';

export default theme => ({
    root: {
        backgroundColor: COLORS.HOME.CategoriesBar.Background.primary,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        minHeight: 30,
    },
    linksBar: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    item: {
        marginRight: '24px',
        position: 'relative',
        padding: '8px 0px',
        '&:hover > div': {
            visibility: 'visible',
            opacity: 1,
        }
    },
    navLink: {
        position: 'inherit',
        fontSize: '18px',
        textTransform: 'capitalize',
        textDecorationLine: 'none',
        transition: theme.transitions.create(),
        color: COLORS.HOME.CategoriesBar.Links.primary,
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'none',
            color: COLORS.HOME.CategoriesBar.Links.hover,
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
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
        borderTopLeftRadius: 0,
        position: 'absolute',
        zIndex: 10,
        right: 0,
        top: '36px',
        left:'0px',
        width: '400px',
        transition: theme.transitions.create(),
        visibility: 'hidden',
        opacity: 0,
    },
    sectionTitle: {
        textTransform: 'uppercase',
        textDecorationLine: 'none',
        color: 'navy',
        marginBottom: theme.spacing(1),
        '& a': {
            textTransform: 'uppercase',
            textDecorationLine: 'none',
            color: 'navy',
        }
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
    listLinkStyle: {
        textDecorationLine: 'none',
        color: 'blue',
        '&:hover': {
            color: 'lightblue',
        }
    },
    // footer
    hoverListContainer: {
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
    hoverListSection: {
        flex: '0 0 calc(50% - 4px)',
        marginBottom: theme.spacing(2),
    },
});