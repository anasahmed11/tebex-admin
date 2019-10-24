import palette from "../../../site-colors";

export default theme => ({
    stepperContainer:{
        position: 'relative',
    },
    indicator: {
        position: 'absolute',
        zIndex: 2,
        fontSize: 40,
        color: palette.second,
        top: 'calc(50% - 30px)',
        right: 'calc(50% - 30px)',
        left: 'calc(50% - 30px)',
    },
    stepper: {
        margin:'auto',
        paddingRight:'0px',
        paddingLeft:'0px',
        width: '80%',
        flexWrap: 'wrap',
        backgroundColor: 'inherit'
    },
});