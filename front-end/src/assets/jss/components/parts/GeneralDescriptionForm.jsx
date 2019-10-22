export default theme => ({
  root: {
    fontFamily: "'Droid Arabic Kufi', 'Ubuntu', 'Roboto'",
    '& input': {
      display: 'block',
      boxSizing: 'border-box',
      width: '100%',
      borderRadius: '4px',
      border: '0',
      borderRadius: '0%',
      borderBottom: '1px solid gray',
      padding: '10px 15px',
      marginBottom: '10px',
      fontSize: '16px',
      '&:hover': {
        borderBottom: '2px solid rgba(0, 0, 0, 0.87)',
      },
      '&:focus': {
        outline: 'none',
        borderBottom: '2px solid #303f9f',
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
      color: '#bf1650',
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


  // button[type="submit"],
  // input[type="submit"] {
  //   background: #ec5990;
  //   color: white;
  //   text-transform: uppercase;
  //   border: none;
  //   margin-top: 40px;
  //   padding: 20px;
  //   font-size: 16px;
  //   font-weight: 100;
  //   letter-spacing: 10px;
  // }

  // button[type="submit"]:hover,
  // input[type="submit"]:hover {
  //   background: #bf1650;
  // }

  // button[type="submit"]:active,
  // input[type="button"]:active,
  // input[type="submit"]:active {
  //   transition: 0.3s all;
  //   transform: translateY(3px);
  //   border: 1px solid transparent;
  //   opacity: 0.8;
  // }

  // input:disabled {
  //   opacity: 0.4;
  // }

  // input[type="button"]:hover {
  //   transition: 0.3s all;
  // }

  // button[type="submit"],
  // input[type="button"],
  // input[type="submit"] {
  //   -webkit-appearance: none;
  // }  