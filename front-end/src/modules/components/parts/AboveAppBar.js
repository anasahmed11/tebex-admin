import React from 'react';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { Link, Grid, withStyles } from '@material-ui/core';

import styles from '../../../assets/jss/components/parts/AboveAppbar';

const cookies = new Cookies();

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
