import palette from "../../../site-colors";

export default theme => ({
    root: {
      backgroundColor: palette.white,
      padding: `${theme.spacing(4)}px 0px`,
    },
    textHead: {
        fontWeight: '500',
        marginBottom: theme.spacing(4),
    }, 
    optionMenusSection: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
  },
});