export const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    demo: {
      backgroundColor: '#fbfdff',
      border: '1px solid #ced8e2',
      marginTop: '45.5px',
      [theme.breakpoints.down("md")]: {
        marginTop: 0,
      }
    },
    title: {
      // margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
      color: 'white',
    },
    listHeader: {
        backgroundColor: 'navy',
    },
    filterTitle: {
      padding: theme.spacing(1),
    },
    link: {
      textDecorationLine: 'none',
    },
    priceSection: {
      display: 'flex',
      alignItems: 'center',
      width: '90%',
      margin: 'auto',
    },
    priceSectionItem: {
    }
  });
  