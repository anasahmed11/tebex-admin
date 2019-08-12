import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Route, withRouter, Link } from 'react-router-dom';
import { Grid, withStyles, Menu, IconButton, AppBar, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';

import CartIcon from './CartIcon'
import Cookies from 'universal-cookie';

import SettingsSection from './SettingsSection';
import ProfileAvatar from './ProfileAvatar';
import SearchBar from './SearchBar';


import globalVariables from '../../../global-variables';



const cookies = new Cookies();

const styles = theme => ({
    root: {
        backgroundColor: 'darkgreen',
        alignItems: 'center',
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        flex: '1 0 15%',
        //[theme.breakpoints.down('sm')]: {
        //flex: '1 0 15%',
        //}
    },
    appBarLink: {
        fontFamily: "'Droid Arabic Kufi', 'Roboto'",
        fontSize: '24px',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        color: 'white',
        transition: theme.transitions.create(['margin'], { duration: '0.3s' }),
        '&:hover': {
            cursor: 'pointer',
            color: 'pink',
            textDecoration: 'none',
        }
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'inherit',
    },
    searchBar: {
        flex: '1 0 calc(100% - 220px - 15%)',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            flex: '1 0 calc(60% - 10px)',
        },
    },
    sectionDesktop: {
        flex: '1 0 220px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    sectionMobile: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flex: '1 0 1%',
            justifyContent: 'flex-end',
        },
    },
    grow: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none'
    },
    menuItem: {
        textAlign: 'inherit',
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
});
class PrimarySearchAppBar extends React.Component {
    state = {
        anchorEl: false,

        mobileMoreAnchorEl: null,

    };

    handleCategoriesList = (event, type) => {
        // alert('yahoo!');
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const authenticated = cookies.get('access_token') !== undefined

        const { anchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);

        const renderLogedInMenu = () => (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <Route component={SettingsSection} />
            </Menu>
        );

        const renderLoginMenu = () => (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <Link to="/auth" className={classes.link}>
                    <MenuItem className={classes.menuItem}>
                        {globalVariables.SETTINGS_SECTION_LOGIN[globalVariables.LANG]}
                    </MenuItem>
                </Link>
            </Menu>
        );


        this.state.anchorEl = null;
        return (
            <AppBar position="static" className={classes.root}>
                <Grid container className={classes.container}>
                    <div className={classes.logo}>
                        <div style={{ width: '80%', margin: 'auto' }}>
                            <Link to='/home'><img style={{ width: '100%' }} src={this.props.logo} alt='logo' /></Link>
                        </div>
                    </div>
                    <div className={classes.searchBar}>
                        <SearchBar placeholder={globalVariables.APPBAR_SEARCH[globalVariables.LANG]} searchIcon />
                    </div>
                    <div className={classes.sectionDesktop}>
                        <div style={{
                            width: '90%',
                            margin: 'auto',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                            <Link to="/shop" className={classes.appBarLink} onMouseEnter={this.handleCategoriesList}>{globalVariables.APPBAR_SHOP[globalVariables.LANG]}</Link>
                            <Route component={CartIcon} />


                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                {authenticated ? <ProfileAvatar img={this.props.user.img} name={this.props.user.first_name} style={{ margin: 0, width: '30px', height: '30px' }} /> : <AccountCircle />}
                            </IconButton>
                        </div>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton aria-haspopup="true" onClick={this.props.menuButtonHandler} color="inherit">
                            <MenuIcon />
                        </IconButton>
                    </div>
                </Grid>
                {authenticated ? <Route component={renderLogedInMenu} /> : <Route component={renderLoginMenu} />}


            </AppBar>
        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        user: state.user.user,

    }
}


export default withRouter(connect(mapStateToProps)(withStyles(styles)(PrimarySearchAppBar)));

