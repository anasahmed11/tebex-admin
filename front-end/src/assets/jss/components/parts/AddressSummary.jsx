import palette from "../../../site-colors";

export default (theme) => ({
    checkoutSummary: {
        padding: `${theme.spacing(2)}px 0px`,
        border: '1px solid rgba(0,0,0,0.1)',
        minHeight: '200px',
    },
    textHeader: {
        fontWeight: '500'
    },
    textSection: {
        fontWeight: '500',
        fontSize: '13px',
        color: palette.dark,
    },
    textHead: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: palette.dark,
    },
});
