import { createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';
import globalVariables from '../global-variables';

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            textPrimary: {
                color: 'white',
            },
            containedPrimary: {
                backgroundColor: '#65477e',
                '&:hover': {
                    backgroundColor: '#412a55'
                }
            },

        },
        MuiExpansionPanel: {
            root: {
                //border: '1px solid #5f4378',
                //margin: '-1px',
            }
        },
        MuiExpansionPanelDetails: {
            root: {
                display: 'inherit'
            }
        },
        MuiExpansionPanelSummary: {
            root: {
                backgroundColor: '#5f4378',
                color: 'white'
            },
            expandIcon: {
                color: 'white'
            }
        },

        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: '#FFBAED',
                }
            }
        },
        MuiInput: {
            underline: {
                '&:hover': {
                    '&:before': {
                        borderBottom: '2px solid #65477e',
                    },
                    '&:after': {
                        borderBottom: '2px solid #412a55',
                    },
                    '&:not(.Mui-disabled):before': {
                        borderBottom: '2px solid #65477e',
                    },

                },
                '&:not(.Mui-disabled):before': {
                    borderBottom: '1px solid #65477e',
                },
                '&:before': {
                    borderBottom: '1px solid #65477e',
                },
                '&:after': {
                    borderBottom: '1px solid #412a55',
                },
            }
        }

    },

    typography: {
        useNextVariants: true,
        fontFamily: "'Open Sans', 'Droid Arabic Kufi', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    direction: globalVariables.LANG === 'ar' ? 'rtl' : 'ltr',
});
export default responsiveFontSizes(theme);