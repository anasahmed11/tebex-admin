import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { ListItemSecondaryAction, Checkbox } from '@material-ui/core';

import uuid from 'uuid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  demo: {
    marginTop: theme.spacing.unit * 5,
    backgroundColor: '#fbfdff',
    border: '1px solid #ced8e2',
  },
  title: {
    // margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    color: 'white',
  },
  listHeader: {
      backgroundColor: 'navy',
  },
  filterTitle: {
    padding: theme.spacing.unit * 1,
  }
});

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
    const filters = this.props.catSpecs;
    const { dense, secondary } = this.state;

    return (
      <div className={classes.root}>
        {/*<div className={classes.listHeader}>
            <Typography variant="h6" className={classes.title} align="center">
                انواع
            </Typography>
        </div>*/}
        {filters? <div className={classes.demo}>
            <List dense={dense}>
              {filters.map((filter) =>
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
