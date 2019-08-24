import COLORS from '../../../site-colors';

export const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    demo: {
      backgroundColor: '#fbfdff',
      border: '1px solid #ced8e2',
      [theme.breakpoints.down("md")]: {
        marginTop: 0,
      }
    },
    mobileToggle: {
      backgroundColor: '#fbfdff',
      border: '1px solid #ced8e2',
      textAlign: 'center',
      padding: theme.spacing(2),
      display: 'none',
      [theme.breakpoints.down("md")]: {
        display: 'block',
      }
    },
    collapsibleTab: {
      cursor: 'pointer',
    },
    filterTitle: {
      padding: theme.spacing(1),
      cursor: 'pointer',
    },
    listHeader: {
        backgroundColor: 'navy',
    },
    link: {
      textDecorationLine: 'none',
      '&:focus': {
        background: 'green !imporant'
      }
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
      textAlign: 'center',
    },
    checkbox: {
      color: 'purple !important',
    }
  });
  