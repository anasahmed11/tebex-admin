import palette from "../../../site-colors";

export default theme => ({
    root: {
        backgroundColor: palette.white,
        padding: `${theme.spacing(4)}px 0px`,
    },
    textHead: {
        fontWeight: '500'
    },
    statsCardsRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    paymentCards: {
        
        position: 'relative',
        padding: `${theme.spacing(4)}px 0px`,   
    },
    shit: {
        '& .ct-label': {
            color: palette.blue,
        },
        '& line.ct-bar': {
            stroke: palette.gray,
        }
    }
});