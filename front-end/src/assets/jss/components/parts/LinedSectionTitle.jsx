export default theme => ({
    span: {
      height: 4,
      width: 80,
      display: 'block',
      margin: `${theme.spacing(1)}px auto`,
      backgroundColor: theme.palette.secondary.main,
    },
    typo: {
      width: '100%',
      textAlign: 'center',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      color: 'white',
    },
});