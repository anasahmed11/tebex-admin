export default (theme) => ({
    root: {
        textAlign:'initial'
    },
    orderContainer: {
        textAlign: 'initial',
        border: '1px solid lightgray',
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
        color: 'navy',
    },
    addButton: {
        fontWeight: 'bold',
    },
    outOfStock: {
        padding: '24px 0px',
        color: 'darkslateblue',
        '& svg': {
            marginRight: 4,
        }
    }
});