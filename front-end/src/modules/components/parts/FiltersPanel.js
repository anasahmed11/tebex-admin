import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';

import { styles } from '../../../assets/jss/components/parts/FiltersPanel';

class InteractiveList extends React.Component {
  state = {
    dense: true,
  };

  handleToggle = (id, idx) => {
    this.props.handleCheck(id, idx);
  };

  render() {

    const { classes, filterPanels } = this.props;
    const { dense } = this.state;
    
    const disableStyle = {
      pointerEvents: 'none',
      opacity: '0.5',
      background: '#EEE'
    }

    return (
      <div id={this.props.id} className={classes.root}>

        {filterPanels?
        <Collapsible open triggerTagName="div" trigger={
          <Typography variant="h6" className={classes.mobileToggle}>
           <FontAwesomeIcon icon={['fas', 'sliders-h']} /> Filters
          </Typography>}>
        <div className={classes.demo} style={this.props.disabled? disableStyle : {}}>
            <List dense={dense}>
              
              {filterPanels.map((filter) => filter.values.length?
                <React.Fragment>
                  <Collapsible className={classes.collapsibleTab} open trigger={
                    <Typography variant="subtitle1" className={classes.filterTitle}>
                      {filter.name.charAt(0).toUpperCase() + filter.name.slice(1)} <Divider />
                    </Typography>}
                  >
                  { filter.type === 'text'?
                    <div className={classes.priceSection}>
                      <form className={classes.priceForm}>
                        <TextField
                          className={classes.priceSectionBox}
                          margin="dense"
                          variant="outlined"
                          type="number"
                          defaultValue={this.props.defaultMin}
                          id={this.props.minBoxId}
                        >
                          {filter.values[1]}
                        </TextField>
                        <Typography className={classes.priceSectionText}> 
                          {globalVariables.LABEL_SHOP_TO[globalVariables.LANG]}
                        </Typography>
                        <TextField
                          className={classes.priceSectionBox}
                          margin="dense"
                          variant="outlined"
                          type="number"
                          defaultValue={this.props.defaultMax}
                          id={this.props.maxBoxId}
                        >
                          {filter.values[0]}
                        </TextField>
                        <Button
                          className={classes.priceSectionButton}
                          variant="contained"
                          color="primary"
                          onClick={this.props.handlePrice}
                        >
                            {globalVariables.LABEL_SHOP_APPLY[globalVariables.LANG]}
                          </Button>
                      </form>
                    </div>
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
                        filter.values.map((value, idx) => 
                        <ListItem key={uuid()}>
                          <ListItemText
                              primary={value[0]}
                              style={{textAlign: globalVariables.LANG === 'ar'? 'right' : 'left'}}
                          />
                          <ListItemSecondaryAction>
                            <Checkbox
                              className={classes.checkbox}
                              onChange={this.handleToggle.bind(this, filter.name, value[0])}
                              checked={value[1]}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>) : null }
                        </Collapsible>
                </React.Fragment> : null
              )}

            </List>
            <Divider />
        </div>
        </Collapsible>
        : null}

      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(InteractiveList));
