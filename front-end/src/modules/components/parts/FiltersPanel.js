import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import { styles } from '../../../assets/jss/components/parts/FiltersPanel';

class InteractiveList extends React.Component {
  state = {
    dense: true,
    checked: [1],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;
    const filterPanels = this.props.filterPanels;
    const { dense } = this.state;

    return (
      <div className={classes.root}>
        {filterPanels? 
        <div className={classes.demo}>
            <List dense={dense}>
              {filterPanels.map((filter) =>
                <React.Fragment>
                  <Typography className={classes.filterTitle}>{filter.name}</Typography>
                  {filter.values['ar'].map((value, idx) =>
                    <ListItem button key={uuid()}>
                      <ListItemText
                          primary={value}
                          style={{textAlign: 'right'}}
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          onChange={this.handleToggle(idx)}
                          checked={this.state.checked.indexOf(idx) !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </React.Fragment>
                )}
            </List>
            <Divider />
        </div>
        : null}
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveList);
