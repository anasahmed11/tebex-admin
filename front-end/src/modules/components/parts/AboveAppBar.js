import React from 'react';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { Link, Grid, withStyles } from '@material-ui/core';

import globalVariables from '../../../global-variables';

const cookies = new Cookies();

const styles = theme => ({
  root: {
    backgroundColor: 'black',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  linksBar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  navLink: {
    fontFamily: "'Droid Arabic Kufi', 'Roboto'",
    fontSize: '14px',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: 'white',
    '&:hover': {
        cursor: 'pointer',
        color: 'pink',
        textDecoration: 'none',
    }
  }
});

class TopNav extends React.Component {
  state = {

  };
  handleLanguageToggle = () => {
    globalVariables.LANG = globalVariables.LANG === 'en'?'ar':'en';
    cookies.set(globalVariables.LANGUGAE,globalVariables.LANG);
    window.location.reload();
  }

  render() {
    const { classes } = this.props;
    const links = (this.props.links.map(item => 
        <Link className={classes.navLink} key={uuid()}>{item}</Link>
    ));

    return <Grid container className={classes.root} justify='center' alignItems='center'>
  
              <Grid sm={10} item className={classes.linksBar}>
                <Link className={classes.navLink} onClick={this.handleLanguageToggle} key={uuid()}>{this.props.language}</Link>
                {links}
              </Grid>
          </Grid>
  }
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNav);
