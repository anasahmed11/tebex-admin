import palette from '../../../site-colors';

export default theme => ({
    root: {
      backgroundColor: palette.first,
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
      background: palette.second,
      // border: `5px solid ${COLORS.HOME.BrandsSection.Icons.primary}`,
      width: '120px !important',
      height: '120px !important',
      padding: theme.spacing(4)
    },
    brandImg: {
      margin: 'auto',
      width: 'inherit',
    },
});