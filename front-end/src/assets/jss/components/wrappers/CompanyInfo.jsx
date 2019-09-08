import COLORS from '../../../site-colors';

export default theme => ({
    root: {
        textAlign:'center',
        background: COLORS.HOME.InfoSection.Background.primary,
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
    },
    infoSection: {
        display: 'flex',
        marginBottom: theme.spacing(4),
    },
    iconContainer: {
        marginRight: theme.spacing(2),  
        flexBasis: '10%',
    },
    icon: {
        color: COLORS.HOME.InfoSection.Icons.primary,
        fontSize: '12vh',
        background: COLORS.HOME.InfoSection.Icons.secondary,
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
        color: COLORS.HOME.InfoSection.Text.primary,
    },
    desc: {
        color: COLORS.HOME.InfoSection.Text.secondary,
    },

    button: {
        margin: theme.spacing(1),
      },
});