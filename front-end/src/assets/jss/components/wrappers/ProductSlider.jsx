import palette from '../../../site-colors';

export default theme => ({
    root: {
      backgroundColor: palette.white,
      paddingTop: theme.spacing(14),
      paddingBottom: theme.spacing(10),
      minHeight: 600,
    },
    sliderLayout: {
      width: '80%',
      margin: 'auto'
    }
});