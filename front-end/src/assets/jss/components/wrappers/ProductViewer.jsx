import palette from '../../../site-colors';

export default theme => ({
    root: {
        backgroundColor: 'inherit'
    },
    productImage: {
        border: `1px solid  ${palette.gray}`,
        position: "relative",
    },
    productImages: {
        width: '60px',
        border: `1px solid ${palette.gray}`,
        height: '80px',
        objectFit: 'contain',
        cursor: 'pointer',
        '&:hover': {
            opacity: '0.6',
        }
    },
    activeImage: {
        border: `1px solid ${palette.darkgray}`,
        width: '60px',
        height: '80px',
        objectFit: 'contain'
    },
    slider: {
        position: 'absolute',
        top: 'calc(50% - 28px / 2)',
    },
    imagesParent: {
        maxWidth: '70px',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%'
          },
    },
});