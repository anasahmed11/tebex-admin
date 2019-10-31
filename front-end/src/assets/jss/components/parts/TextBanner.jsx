import palette from "../../../site-colors";

export default theme => ({
    root: {
        // backgroundImage: 'radial-gradient(25% 100%,#30b8ff 0,#0077b5 100%)',
        backgroundImage: `radial-gradient(25% 100%, ${palette.first} 0, ${palette.blue} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        height: '40vw',
        minHeight: '245px',
        maxHeight: '480px',
    },
    banner: {
        borderRadius: '0px',
        // margin: '25vh',
        /* margin: '10%',
        [theme.breakpoints.down("sm")]: {
            margin: '15%',
        },
        [theme.breakpoints.down("xs")]: {
            margin: '20%',
        } */
    },
    text: {
        color: palette.white,
    }
})