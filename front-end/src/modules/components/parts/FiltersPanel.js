import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Typography } from '@material-ui/core';

import { styles } from '../../../assets/jss/components/parts/FiltersPanel';

class InteractiveList extends React.Component {
  state = {
    dense: true,
    secondary: false,
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
    const { dense, secondary } = this.state;

    return (
      <div className={classes.root}>
        {/*<div className={classes.listHeader}>
            <Typography variant="h6" className={classes.title} align="center">
                انواع
            </Typography>
        </div>*/}
        {filterPanels? <div className={classes.demo}>
            <List dense={dense}>
              {filterPanels.map((filter) =>
                <React.Fragment>
                  <Typography className={classes.filterTitle} variant="subheading">{filter.name}</Typography>
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
