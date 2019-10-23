import COLORS from '../../../site-colors';

export default theme => ({
    root: {
      backgroundColor: COLORS.HOME.ProductsSection.Background.primary,
      paddingTop: theme.spacing(14),
      paddingBottom: theme.spacing(10),
      minHeight: 600,
    },
    sliderLayout: {
      width: '80%',
      margin: 'auto'
    }
});