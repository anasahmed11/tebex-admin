import palette from "../../../site-colors";

export const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    demo: {
      // backgroundColor: '#fbfdff',
      backgroundColor: palette.white,
      border: `1px solid ${palette.first}`,
      [theme.breakpoints.down("md")]: {
        marginTop: 0,
      }
    },
    listLayout: {
      padding: 0,
      margin: -1,
      '& .Collapsible__contentInner': {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1),
      }
    },
    mobileToggle: {
      backgroundColor: palette.darksecond,
      // border: '1px solid #5f4378',
      textAlign: 'center',
      color: palette.white,
      fontWeight: '700',
      textTransform: 'uppercase',
      padding: theme.spacing(2),
      display: 'none',
      [theme.breakpoints.down("md")]: {
        display: 'block',
      }
    },
    collapsibleTab: {
      cursor: 'pointer',
      background: palette.blue,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& svg': {
        marginRight: theme.spacing(2),
        fontSize: '20px',
        color: palette.white,
      }
    },
    filterTitle: {
      padding: theme.spacing(1),
      cursor: 'pointer',
      textTransform: 'uppercase',
      fontWeight: '700',
      color: palette.white,
    },
    listHeader: {
      backgroundColor: palette.first,
    },
    listItem: {
      '&:hover': {
        background: palette.second,
        color: palette.white,
      },
      '&:hover $listItemText span': {
        color: palette.white,
      }
    },
    listItemText: {
      textAlign: 'left',
      color: palette.blue,
    },
    link: {
      textDecorationLine: 'none',
    },
    priceSection: {
      display: 'flex',
      alignItems: 'center',
    },
    priceForm: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      width: '90%',
      margin: 'auto',
      justifyContent: 'space-between',
    },
    priceSectionBox: {
      flexBasis: '42%',
      textAlign: 'center',
    },
    priceSectionText: {
      flexBasis: '15%',
      textAlign: 'center',
    },
    priceSectionButton: {
      marginTop: '2px',
      fontWeight: '700',
    },
    checkbox: {
      color: `${palette.first} !important`,
    }
  });
  