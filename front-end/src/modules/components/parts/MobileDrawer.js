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
import { Link } from 'react-router-dom';

import styles from '../../../assets/jss/components/parts/MobileDrawer';
import Cookies from 'universal-cookie';
import ProfileAvatar from './ProfileAvatar';
import { AccountCircle } from '@material-ui/icons';
import globalVariables from '../../../global-variables';

const cookies = new Cookies();

class BannersDrawer extends React.Component {
  state = {
    dir: 'right',
  };

  render() {
    const { classes } = this.props;
    const authenticated = cookies.get('access_token') !== undefined
    const sideList = (
      <div className={classes.list}>
        <List>
          {this.props.upperLinks.map((item, index) => (
            <ListItem button to={item.link} component={Link} onClick={item.onClick} key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button to={authenticated ? '/profile' : '/auth?type=login'} component={Link}>
            <ListItemIcon>{authenticated ? <ProfileAvatar style={{fontSize:'16px'}} /> : <AccountCircle />}</ListItemIcon>
            <ListItemText primary={authenticated ? globalVariables.PROFILE_TITLE[globalVariables.LANG] : globalVariables.SETTINGS_SECTION_LOGIN[globalVariables.LANG]} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {this.props.bottomLinks.map((item, index) => (
            <ListItem button to={item.link} component={Link} onClick={item.onClick} key={index}>
               <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
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
