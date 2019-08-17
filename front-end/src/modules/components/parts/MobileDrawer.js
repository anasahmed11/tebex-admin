import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import styles from '../../../assets/jss/components/parts/MobileDrawer';

class BannersDrawer extends React.Component {
  state = {
    dir: 'right',
  };

  render() {
    const { classes } = this.props;
    
    const sideList = (
        <div className={classes.list}>
          <List>
            {this.props.upperLinks.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {this.props.bottomLinks.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );

    return (
      <div>
        <Drawer anchor={this.state.dir} open={this.props.open} onClose={this.props.closeHandler}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.closeHandler}
            onKeyDown={this.props.closeHandler}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

BannersDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BannersDrawer);
