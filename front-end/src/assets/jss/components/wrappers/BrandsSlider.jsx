import COLORS from '../../../site-colors';

export default theme => ({
    root: {
      backgroundColor: COLORS.HOME.BrandsSection.Background.primary,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    sliderLayout: {
      width: '80%',
      margin: 'auto',
      marginTop: theme.spacing(1),
      marginBottom: -theme.spacing(10),
    },
    brandDiv: {
      background: COLORS.HOME.BrandsSection.Icons.secondary,
      // border: `5px solid ${COLORS.HOME.BrandsSection.Icons.primary}`,
      width: '120px !important',
      height: '120px !important',
      padding: theme.spacing(4)
    },
    brandImg: {
      margin: 'auto'
    }
});