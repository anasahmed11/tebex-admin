import React from 'react';

import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';

import CardH from './HorizontalCard';
import CardV from './PersonCard';

const WithWidth = props => {
    const { width } = props;
    return <React.Fragment>
      {width === 'sm' || width === 'xs'?
      <CardV style={{position:'absolute'}} key={props.key} person={props.person}/>
      :
      <CardH style={{position:'absolute'}} key={props.key} person={props.person}/>}
      </React.Fragment>
}

WithWidth.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(WithWidth);