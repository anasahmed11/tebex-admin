// import COLORS from '../../../site-colors';

export default theme => ({
    root: {
        backgroundColor: '#fff',
    },
    productsSection: {
        // marginTop: theme.spacing(5),
        // justifyContent: 'center',
        flexWrap: 'wrap',
    },
    toolbar: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        margin: 'auto',
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(.5),
        width: 'calc(0.97 * 100%)',
        alignItems: 'center',
        [theme.breakpoints.down("xs")]: {
            width: 'calc(0.95 * 100%)',
        }
    },
    optionMenusSection: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
    },
    categoryTrace: {
        display: 'flex',
        flexGrow: 1,
        /*
        border: '1px solid grey',
        borderRadius: '4px',
        */
        margin: theme.spacing(0.5),
        padding: theme.spacing(1),
    },
    categoryLinkElement: {
        display: 'flex',
        marginRight: theme.spacing(1),
        '&:after': {
            content: '"»"',
            marginLeft: theme.spacing(1)
        },
        '&:last-child:after': {
            content: '""',
        }
    },
    categoryLink: {
        textDecorationLine: 'none',
        color: 'grey',
        '&:hover': {
            color: 'blue',
        },
    },
    shopComponent: {
        border: '1px solid black',
        boxShadow: '5px 5px 5px 5px black',
        marginTop: -4 * theme.spacing() ,
    },
    noProducts: {
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    }
})