import React from 'react';

import { withStyles, Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import styles from '../../../assets/jss/components/parts/IconLink';

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
