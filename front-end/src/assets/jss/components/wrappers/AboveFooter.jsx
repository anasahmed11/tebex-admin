import palette from '../../../site-colors';

export default theme => ({
    root: {
        textAlign:'center',
        background: palette.white,
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
    },
    sectionContainer: {
        flexBasis: '32%',
        [theme.breakpoints.down('md')]: {
            flexBasis: '48%',
        },
        [theme.breakpoints.down('xs')]: {
            flexBasis: '100%',
        },
    },
    infoSection: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(4),
    },
    iconContainer: {
        marginBottom: theme.spacing(2),
    },
    icon: {
        color: palette.first,
        //fontSize: '12vh',
        //background: '#38c49d',
        padding: theme.spacing(3),
        //width: '12vh !important',
    },
    infoText: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        color: palette.first,
    },
    desc: {
        color: palette.dark,
    }
});