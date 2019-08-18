import COLORS from '../../../site-colors';

export default theme => ({
    root: {
        backgroundColor: COLORS.HOME.Footer.Background.primary,
    },
    footer: {
        width: '80%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
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
        color: COLORS.HOME.Footer.Text.primary,
    },
    list: {
        margin: 0,
        listStyle: 'none',
        paddingLeft: 0,
      },
    listItem: {
        paddingTop: theme.spacing(0.5), // it was unit/2
        paddingBottom: theme.spacing(0.5), // it was unit/2
    },
    footerLink: {
        color: COLORS.HOME.Footer.Links.primary,
    }
});