export default theme => ({
    root: {
        backgroundColor: '#fff',
    },
    productsSection: {
        // marginTop: theme.spacing(5),
        // justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
    },
    optionMenusSection: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 'auto',
        marginTop: theme.spacing(1),
        width: 'calc(0.97 * 100%)',
        [theme.breakpoints.down("xs")]: {
            width: 'calc(0.95 * 100%)',
        }
    },
    shopComponent: {
        border: '1px solid black',
        boxShadow: '5px 5px 5px 5px black',
        marginTop: -4 * theme.spacing() ,
    }
})