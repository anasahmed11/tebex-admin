import COLORS from '../../../site-colors';

export default theme => ({
    root: {
      backgroundColor: COLORS.HOME.LinksBar.background.primary,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      }
    },
    linksBar: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    navLink: {
      fontFamily: "'Droid Arabic Kufi', 'Roboto'",
      fontSize: '12px',
      [theme.breakpoints.up('lg')]: {
        fontSize: '14px',
      },
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      color: COLORS.HOME.LinksBar.links.primary,
      '&:hover': {
          cursor: 'pointer',
          color: COLORS.HOME.LinksBar.links.hover,
          textDecoration: 'none',
      }
    }
  });