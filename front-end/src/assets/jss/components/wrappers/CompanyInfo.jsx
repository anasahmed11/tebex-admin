import palette from '../../../site-colors';

export default theme => ({
    root: {
        textAlign:'center',
        background: palette.first,
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
    },
    infoSection: {
        display: 'flex',
        marginBottom: theme.spacing(4),
    },
    iconContainer: {
        marginRight: theme.spacing(2),  
        // flexBasis: '10%',
    },
    icon: {
        color: palette.second,
        fontSize: '12vh',
        background: palette.white,
        padding: theme.spacing(2),
        width: '54px !important',
        height: '54px !important',
        borderRadius: '50%',
    },
    infoText: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '90%',
    },
    title: {
        color: palette.second,
    },
    desc: {
        color: palette.gray,
    },

    button: {
        margin: theme.spacing(1),
      },
});