import React from 'react';
import PropTypes from 'prop-types';

import { Link, Grid, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import styles from '../../../assets/jss/components/parts/AboveAppbar';


function TopNav(props) {
  
    const { classes } = props;
    return <Grid container className={classes.root} justify='center' alignItems='center'>
  
              <Grid sm={10} item className={classes.linksBar}>
                {
                  props.links.map((item,idx) => 
                  <Link component={RouterLink} onClick={item.onClick} to={item.link} className={classes.navLink} key={idx}>{item.title}</Link>)
                }
              </Grid>
          </Grid>
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNav);
