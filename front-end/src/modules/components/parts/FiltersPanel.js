import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';
import { withRouter, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Typography, TextField, Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import { styles } from '../../../assets/jss/components/parts/FiltersPanel';

class InteractiveList extends React.Component {
  state = {
    dense: true,
  };

  handleToggle = (id, idx) => {
    this.props.handleCheck(id, idx);
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
                  <Typography className={classes.filterTitle}>{filter.name[globalVariables.LANG]}</Typography>
                  { filter.type === 'text'? <form className={classes.priceSection}>
                      <TextField className={classes.priceSectionItem} margin="dense" variant="outlined">{filter.values[1]}</TextField>
                      <Typography className={classes.priceSectionItem}> الى </Typography>
                      <TextField className={classes.priceSectionItem} margin="dense" variant="outlined">{filter.values[0]}</TextField>
                      <Button className={classes.priceSectionItem} variant="contained" color="primary">تطبيق</Button>
                    </form>

                    : filter.type === 'link'? filter.values.map((value) =>
                      <Link className={classes.link} to={`/shop/${value.slug}`}>
                        <ListItem button key={uuid()}>
                          <ListItemText
                                  primary={value.name[globalVariables.LANG]}
                                  style={{textAlign: globalVariables.LANG === 'ar'? 'right' : 'left'}}
                          />
                        </ListItem>
                      </Link>)

                    : filter.type === 'menu'?
                        filter.values[globalVariables.LANG].map((value, idx) => <ListItem key={uuid()}>
                          <ListItemText
                              primary={value}
                              style={{textAlign: globalVariables.LANG === 'ar'? 'right' : 'left'}}
                          />
                          <ListItemSecondaryAction>
                            <Checkbox
                              onChange={this.handleToggle.bind(this, filter.id, idx)}
                              checked={filter.checked[idx]}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>) : null }
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

export default withRouter(withStyles(styles)(InteractiveList));
