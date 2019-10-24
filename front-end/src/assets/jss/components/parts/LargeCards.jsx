export default theme => ({
   
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(2),
        width: '80%',
        justifyContent:'space-between',
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
        },
    },
    
    image: {
        position: 'relative',
        overflow: 'hidden',
        height: 500,
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 300,
            
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
            '& $imageSrc': {
                transform: 'scale(1.2)',
            }
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        transition: theme.transitions.create(['all'], {duration: '0.8s'})
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1)+6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});