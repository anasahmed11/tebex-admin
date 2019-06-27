import React from 'react';
import PropTypes from 'prop-types';

import { Grid, withStyles, Menu, Badge, IconButton, AppBar, MenuItem } from '@material-ui/core';
import {Menu as MenuIcon, Mail as MailIcon, AccountCircle} from '@material-ui/icons';
import {  Route, Link } from 'react-router-dom';

import CartIcon from './CartIcon'
import Cookies from 'universal-cookie';

import SettingsSection from './SettingsSection';
// import NotificationsIcon from '@material-ui/icons/Notifications';

import ProfileAvatar from './ProfileAvatar';

import SearchBar from './SearchBar';



const cookies = new Cookies();

const styles = theme => ({
  root: {
    backgroundColor: 'darkgreen',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    flex: '1 0 10%',
    //[theme.breakpoints.down('sm')]: {
      //flex: '1 0 15%',
    //}
  },
  appBarLink: {
    fontFamily: "'Droid Arabic Kufi', 'Roboto'",
    fontSize: '24px',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: 'white',
    transition: theme.transitions.create(['margin'], {duration: '0.3s'}),
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
    flex: '1 0 40%',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flex: '1 0 calc(60% - 10px)',
    },
  },
  sectionDesktop: {
    flex: '1 0 20%',
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
      flex: '1 0 10%',
      justifyContent: 'flex-end',
    },
  },
  grow: {
    flexGrow: 1,
  },
});

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
    const authenticated = cookies.get('access_token')!== undefined

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
        <MenuItem>
          تسجيل الدخول
        </MenuItem>
      </Menu>
    );

    return (
        <AppBar position="static" className={classes.root}>
          <Grid container className={classes.container}>
            <div className={classes.logo}>
              <div style={{width: '80%', margin: 'auto'}}>
                <Link to='/home'><img style={{width: '100%'}} src={this.props.logo} alt='logo' /></Link>
              </div>
            </div>
            <div className={classes.searchBar}>
              <SearchBar placeholder='ابحث..' searchIcon />
            </div>
            <div className={classes.sectionDesktop}>
              <div style={{
                  width: '80%',
                  margin: 'auto',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
              <Link to="/shop" className={classes.appBarLink} onMouseEnter={this.handleCategoriesList}>تسوق</Link>
              <Route component={CartIcon} />
              
              
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                {authenticated?<ProfileAvatar style={{margin:0,width:'30px',height:'30px'}} />:<AccountCircle />}
              </IconButton>
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.props.menuButtonHandler} color="inherit">
                <MenuIcon />
              </IconButton>
            </div>
          </Grid>
          {authenticated?<Route component={renderLogedInMenu} />:<Route component={renderLoginMenu} />}


        </AppBar>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);
