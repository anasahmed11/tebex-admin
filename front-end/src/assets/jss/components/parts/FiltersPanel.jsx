// import COLORS from '../../../site-colors';

export const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    demo: {
      // backgroundColor: '#fbfdff',
      backgroundColor: 'white',
      border: `1px solid #5f4378`,
      [theme.breakpoints.down("md")]: {
        marginTop: 0,
      }
    },
    listLayout: {
      padding: 0,
      marginLeft: -1,
      '& .Collapsible__contentInner': {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1),
      }
    },
    mobileToggle: {
      backgroundColor: '#3b1b57',
      // border: '1px solid #5f4378',
      textAlign: 'center',
      color: 'white',
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
      background: '#5f4378',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& svg': {
        marginRight: theme.spacing(2),
        fontSize: '20px',
        color: 'white',
      }
    },
    filterTitle: {
      padding: theme.spacing(1),
      cursor: 'pointer',
      textTransform: 'uppercase',
      fontWeight: '700',
      color: 'white',
    },
    listHeader: {
      backgroundColor: 'navy',
    },
    listItem: {
      '&:hover': {
        background: '#a188a9',
        color: 'white',
      },
      '&:hover $listItemText span': {
        color: 'white',
      }
    },
    listItemText: {
      textAlign: 'left',
      color: '#5f4378'
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
      flexBasis: '100%',
      marginTop: '2px',
      textAlign: 'center',
      fontWeight: '700',
      backgroundColor: '#412a55',
      '&:hover': {
        backgroundColor: '#65477e',
      }
    },
    checkbox: {
      color: 'purple !important',
    }
  });
  