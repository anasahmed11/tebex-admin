import palette from "../../../site-colors";

export default theme => ({
  root: {
    textAlign: 'initial',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: theme.spacing(0.5),
    textTransform: 'uppercase',
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  section: {
    marginBottom: theme.spacing(1),
    display: 'table',
    '& p': {
      display: 'table-row',
      textAlign: 'start',
    },
    '& p span': {
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'left',
      paddingRight: theme.spacing(2),
    },
    '& p span:first-child': {
      fontSize: 12,
      color: palette.dark,
      textTransform: 'uppercase',
    }
  },
  seller: {
    fontSize: 16,
    color: palette.blue,
  },
  oldPrice: {
    fontSize: 16,
    color: palette.dark,
    textDecorationLine: 'line-through',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 30,
    color: palette.blue,
  },
  saving: {
    fontWeight: 'bold',
    fontSize: 16,
    color: palette.blue,
  },
  specsTitle: {
    textAlign: 'left',
    marginBottom: theme.spacing(0.5),
    // fontSize: 16,
    // fontWeight: 'bold',
  },
  specName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  specButton: {
    display: 'inline-block !important',
    cursor: 'pointer',
    fontSize: 14,
    border: `1px solid ${palette.blue}`,
    borderRadius: '2px',
    color: palette.blue,
    textAlign: 'center !important',
    padding: '4px 16px !important',
    margin: 2,
    '&:hover': {
      background: palette.dark,
    }
  },
  specButtonActive: {
    display: 'inline-block !important',
    cursor: 'auto',
    fontWeight: 'bold',
    fontSize: 14,
    border: `1px solid ${palette.black}`,
    borderRadius: '2px',
    color: palette.black,
    textAlign: 'center !important',
    padding: '4px 16px !important',
    margin: 2,
  },
  productDesc: {
    fontSize: 16,
    textAlign: 'left',
  }
});