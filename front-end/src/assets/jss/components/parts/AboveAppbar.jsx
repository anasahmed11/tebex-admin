import palette from "../../../site-colors";

export default theme => ({
    root: {
      backgroundColor: palette.darkfirst,
    },
    navLink: {
      fontFamily: "'Droid Arabic Kufi', 'Roboto'",
      fontSize: '12px',
      [theme.breakpoints.up('lg')]: {
        fontSize: '14px',
      },
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      color: palette.gray,
      '&:hover': {
          cursor: 'pointer',
          color: palette.yellow,
          textDecoration: 'none',
      }
    }
  });