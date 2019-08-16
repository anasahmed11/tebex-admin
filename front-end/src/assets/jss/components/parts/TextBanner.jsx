export const styles = theme => ({
    root: {
        // backgroundImage: 'radial-gradient(25% 100%,#30b8ff 0,#0077b5 100%)',
        backgroundImage: 'radial-gradient(25% 100%,#7c6e9d 0,#594589 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        [theme.breakpoints.down("xs")]: {
            height: '60vh',
        }
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
        color: 'white',
        [theme.breakpoints.down("sm")]: {
            fontSize: '4rem',
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: '3rem',
        }
    }
})