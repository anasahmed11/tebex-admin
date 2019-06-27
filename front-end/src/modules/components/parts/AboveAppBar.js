import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import uuid from 'uuid';

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
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
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

  render() {
    const { classes } = this.props;
    const links = (this.props.links.map(item => 
        <Link className={classes.navLink} key={uuid()}>{item}</Link>
    ));

    return <Grid container className={classes.root} justify='center' alignItems='center'>
              <Grid sm={10} item className={classes.linksBar}>
                {links}
              </Grid>
          </Grid>
  }
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNav);
