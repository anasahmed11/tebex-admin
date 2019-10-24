import palette from "../../../site-colors";

export default (theme) => ({
    root: {
        textAlign:'initial'
    },
    orderContainer: {
        textAlign: 'initial',
        border: `1px solid ${palette.gray}`,
        padding: '10px'
    },
    orderHeader:  {
        textAlign: 'center',
        marginBottom: theme.spacing(1),
    },
    divider: {
        marginBottom: theme.spacing(0.5),
    },
    section: {
        marginBottom: theme.spacing(1),
        display: 'table',
        '& p': {
            display: 'table-row',
        },
        '& p span': {
            display: 'table-cell',
            verticalAlign: 'middle',
            textAlign: 'left',
            fontSize: 14,
            paddingRight: theme.spacing(2),
        },
    },
    orderSelectMenu: {
        fontSize: '14px',
        padding: '8px 30px 8px 24px',
    },
    cleanLink: {
        textDecoration: 'none',
        color: palette.first,
    },
    addButton: {
        fontWeight: 'bold',
    },
    outOfStock: {
        padding: '24px 0px',
        color: palette.first,
        '& svg': {
            marginRight: 4,
        }
    },

    supportSection: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        borderLeft: `1px solid ${palette.gray}`,
    },
    infoSection: {
        display: 'flex',
        marginBottom: theme.spacing(2.5),
    },
    iconContainer: {
        marginRight: theme.spacing(1),
        flexBasis: '10%',
    },
    icon: {
        color: palette.blue,
        fontSize: '30px',
        // background: 'green',
        padding: theme.spacing(0.5),
        width: '30px !important',
    },
    infoText: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '90%',
    },
    title: {
        color: palette.blue,
        fontWeight: 'bold',
        fontSize: 12,
    },
    desc: {
        color: palette.darkgray,
        fontSize: 11,
    }
});