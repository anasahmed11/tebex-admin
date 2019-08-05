import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from 'react-router-dom'

const styles = theme => ({
  icon: {
    margin: theme.spacing(1),
    fontSize: '30px',
    color: 'white',
    transition: theme.transitions.create('color'),
    '&:hover':{
        color: 'blue'
    }
  },
  input: {
    display: 'none',
  },
});

function IconLink(props) {
  const { classes, href } = props;
  return <Link href={href}>
          <FontAwesomeIcon className={classes.icon} icon={['fab', props.icon]} />
      </Link>
}

IconLink.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLink);
