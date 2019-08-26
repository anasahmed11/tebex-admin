export default theme => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      marginLeft: theme.spacing(2),
    },
    textField: {
      width: 150,
      marginLeft: theme.spacing(1),
    },
    dense: {
    },
    input: {
      padding: theme.spacing(1.5),
    }
});