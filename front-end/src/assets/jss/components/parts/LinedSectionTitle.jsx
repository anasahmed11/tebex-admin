import palette from "../../../site-colors";

export default theme => ({
    span: {
      height: 4,
      width: 80,
      display: 'block',
      margin: `${theme.spacing(1)}px auto`,
      backgroundColor: palette.second,
    },
    typo: {
      width: '100%',
      textAlign: 'center',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      color: 'white',
    },
});