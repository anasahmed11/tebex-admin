import React from 'react';
import PropTypes from 'prop-types';
import globalVariables from '../../../global-variables';

import { Route, Link } from 'react-router-dom';
import { Grid, withStyles, Menu, IconButton, AppBar, MenuItem, Typography } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';

import CartIcon from './CartIcon'
import Cookies from 'universal-cookie';

import SettingsSection from './SettingsSection';
import ProfileAvatar from './ProfileAvatar';
import SearchBar from './SearchBar';

import styles from '../../../assets/jss/components/parts/AppBar';

const cookies = new Cookies();

class PrimarySearchAppBar extends React.Component {
    
    state = {
        anchorEl: null,
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
                        <div className={classes.sectionDesktopInner}>
                            <div className={classes.sectionDesktopLinks}>
                                <Typography variant="h5">
                                    <Link to="/shop" className={classes.appBarLink} onMouseEnter={this.handleCategoriesList}>{globalVariables.APPBAR_SHOP[globalVariables.LANG]}</Link>
                                </Typography>
                            </div>
                            <div className={classes.sectionDesktopIcons}>
                                <Route component={CartIcon} />
                                <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    {authenticated ? <ProfileAvatar style={{ margin: 0, width: '30px', height: '30px' }} /> : <AccountCircle />}
                                </IconButton>
                            </div>
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



export default withStyles(styles)(PrimarySearchAppBar);

