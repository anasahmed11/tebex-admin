import palette from '../../../site-colors';

export default theme => ({
    root: {
        backgroundColor: palette.darkfirst,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    footer: {
        width: '80%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
        }
    },
    footerSection: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            flex: '1 0 50%',
        },
        [theme.breakpoints.down('xs')]: {
            flex: '1 0 100%',
        },
    },
    sectionTitle: {
        color: palette.second,
    },
    list: {
        margin: 0,
        listStyle: 'none',
        paddingLeft: 0,
      },
    listItem: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
    footerLink: {
        color: palette.gray,
        textDecorationLine: 'none',
        '&:hover': {
            color: palette.yellow,
        }
    }
});