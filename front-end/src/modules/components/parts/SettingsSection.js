import React from 'react';
import 'typeface-roboto';
import { withStyles, MenuList, MenuItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { 
    AccountCircle as AccountIcon, 
    Dashboard as DashboardIcon, 
    Link as LinkIcon, 
    People as PeopleIcon, 
    ExitToApp as LogoutIcon,
    EventNote as NotesIcon,
} from '@material-ui/icons';

import { Link, Route } from 'react-router-dom';

import LogoutButton from './LogoutButton';

const styles = theme => ({
    root: {
        backgroundColor: 'white ',
        padding: `${theme.spacing.unit * 4}px 0px`,
    },
    menuItem: {
        textAlign:'inherit',
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {},
    textHead:{
        fontWeight:'500'
    },
    link:{
        textDecoration:'none'
    },
    settingsMenu: {
        width: '100%',
        marginBottom: theme.spacing.unit * 2,
    }
});

class SettingsSection extends React.Component{

    handleRedirect = (props) =>{
        setTimeout(()=>{this.props.history.push('/auth',{pathname:'http://localhost:3000'});},3000)
    }
    render(){
        const {classes, } = this.props;
        
        return(
            <MenuList >
                <Link to="/profile" className={classes.link}>
                    <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <AccountIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} className={classes.link} inset primary="الملف الشخصي" /> 
                    </MenuItem>
                </Link>
                <Link to="/orders" className={classes.link}>
                    <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <NotesIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} className={classes.link} inset primary="مشترياتي" /> 
                    </MenuItem>
                </Link>
                <Link to="/dashboard" className={classes.link}>
                    <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <DashboardIcon />
                        </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="داش بورد" /> 
                    </MenuItem>
                </Link>
                <Link to="/linkgenerator" className={classes.link}> 
                    <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <LinkIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="مولد اللنكات" />
                    </MenuItem>
                </Link>
                <Link to="/tree" className={classes.link}>
                    <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="شجرة الفريق" /> 
                    </MenuItem>
                </Link>
                <Divider />
                
                <LogoutButton handleRedirect={() => this.handleRedirect(this.props)}>
                    <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="تسجيل الخروج" /> 
                    </MenuItem>
                </LogoutButton>
            </MenuList>
        );
    }
}


export default withStyles(styles)(SettingsSection);