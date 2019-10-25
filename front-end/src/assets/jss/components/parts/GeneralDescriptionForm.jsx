import palette from "../../../site-colors";

export default theme => ({
  root: {
    fontFamily: "'Droid Arabic Kufi', 'Ubuntu', 'Roboto'",
    '& input': {
      display: 'block',
      boxSizing: 'border-box',
      width: '100%',
      // borderRadius: '4px',
      border: '0',
      borderRadius: '0%',
      borderBottom: `1px solid ${palette.darkgray}`,
      padding: '10px 15px',
      marginBottom: '10px',
      fontSize: '16px',
      '&:hover': {
        borderBottom: '2px solid rgba(0, 0, 0, 0.87)',
      },
      '&:focus': {
        outline: 'none',
        borderBottom: `2px solid ${palette.blue}`,
        borderBottomWidth: '2px'
      },
      '&:disabled': {
        opacity: 0.4,
      }
    },
    '& label': {
      lineHeight: '1',
      textAlign: 'left',
      display: 'block',
      color: 'rgba(0, 0, 0, 1)',
      fontSize: '1rem',
      fontFamily: "'Droid Arabic Kufi', 'Ubuntu', 'Roboto'",
    },
    '& p': {
      color: palette.second,
      marginBottom: '10px',
      fontSize: '14px',
      marginTop: '-10px',
      '& before': {
        display: 'inline',
        content: "⚠ ",
      }
    },
    '& p.desc': {
      marginBottom: '15px',
      color: 'rgba(0, 0, 0, 0.6)',
    },

    '& textarea': {
      marginBottom: '10px',

      width: '100%'

    }
  },
});