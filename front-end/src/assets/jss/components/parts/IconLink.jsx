import palette from "../../../site-colors";

export default theme => ({
    icon: {
      margin: theme.spacing(1),
      fontSize: '30px',
      transition: theme.transitions.create('color'),
      '&:hover':{
          color: palette.second,
      }
    },
    input: {
      display: 'none',
    },
});
  