import { createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';
import globalVariables from '../global-variables';
import palette from './site-colors';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            textPrimary: {
                color: 'white',
            },
            containedPrimary: {
                backgroundColor: palette.first,
                '&:hover': {
                    backgroundColor: palette.darkfirst,
                }
            },
            containedSecondary: {
                backgroundColor: palette.second,
                '&:hover': {
                    backgroundColor: palette.darksecond,
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
                backgroundColor: palette.first,
                color: 'white'
            },
            expandIcon: {
                color: 'white'
            }
        },

        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: palette.second,
                }
            }
        },
        MuiInput: {
            underline: {
                '&:hover': {
                    '&:before': {
                        borderBottom: `2px solid ${palette.first}`,
                    },
                    '&:after': {
                        borderBottom: `2px solid ${palette.darkfirst}`,
                    },
                    '&:not(.Mui-disabled):before': {
                        borderBottom: `2px solid ${palette.first}`,
                    },

                },
                '&:not(.Mui-disabled):before': {
                    borderBottom: `1px solid ${palette.first}`,
                },
                '&:before': {
                    borderBottom: `1px solid ${palette.first}`,
                },
                '&:after': {
                    borderBottom: `1px solid ${palette.darkfirst}`,
                },
            }
        }

    },

    typography: {
        useNextVariants: true,
        fontFamily: "'Open Sans', 'Droid Arabic Kufi', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h6:{
            // [defaultTheme.breakpoints.down("md")]: {
            //     fontSize: '1.1rem !important',
            // },
            // [defaultTheme.breakpoints.down("sm")]: {
            //     fontSize: '0.9rem !important',
            // },
            // [defaultTheme.breakpoints.down("xs")]: {
            //     fontSize: '0.7rem !important',
            // },
             
        }
    },
    direction: globalVariables.LANG === 'ar' ? 'rtl' : 'ltr',
});
export default responsiveFontSizes(theme);