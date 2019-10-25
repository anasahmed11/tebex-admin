import React from 'react';
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import globalVariables from '../../../global-variables';

import 'typeface-roboto';
import {
    withStyles, MenuList, MenuItem, ListItemIcon,
    ListItemText, Divider, Grid, Collapse, ListItem
} from '@material-ui/core';

import { 
    AccountCircle as AccountIcon, 
    Dashboard as DashboardIcon, 
    Link as LinkIcon, 
    People as PeopleIcon, 
    ExitToApp as LogoutIcon,
    EventNote as NotesIcon,
    ExpandLess,
    ExpandMore,
} from '@material-ui/icons';


import LogoutButton from './LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'uuid';

import styles from '../../../assets/jss/components/parts/SettingsSection';

class SettingsSection extends React.Component{
    state = {
        affiliateOpen: false,
        sellerOpen: false,
    }
    handleRedirect = () =>{
        setTimeout(()=>{this.props.history.push('./');},1500)
    }

    handleAffiliateOpen = () => {
        this.setState({affiliateOpen:!this.state.affiliateOpen})   
    }
    handleSellerOpen = () => {
        this.setState({sellerOpen:!this.state.sellerOpen})   
    }
    
    render(){
        const {classes, } = this.props;
        const isAffiliate = this.props.program.affiliate==="Approved";
        const isSeller = this.props.program.seller==="Approved";

        return(
            <React.Fragment>
                {this.props.isLoading?
                    <Grid container alignItems="center" justify="center" >
                        <ClipLoader
                            sizeUnit={"px"}
                            size={75}
                            color={'#123abc'}
                            loading={this.props.isLoading}
                        />
                    </Grid>
                :
                <MenuList >
                        <Link to="/profile" className={classes.link}>
                            <MenuItem className={classes.menuItem}>
                                <ListItemIcon className={classes.icon}>
                                    <AccountIcon />
                                </ListItemIcon>
                                <ListItemText className={classes.link} inset primary={globalVariables.SETTINGS_SECTION_PROFILE[globalVariables.LANG]} /> 
                            </MenuItem>
                        </Link>
                        <Link to="/orders" className={classes.link}>
                            <MenuItem className={classes.menuItem}>
                                <ListItemIcon className={classes.icon}>
                                    <NotesIcon />
                                </ListItemIcon>
                                <ListItemText className={classes.link} inset primary={globalVariables.SETTINGS_SECTION_ORDERS[globalVariables.LANG]} /> 
                            </MenuItem>
                        </Link>
                        {isAffiliate?
                            <ListItem key={uuid()} button onClick={this.handleAffiliateOpen}>
                                <ListItemIcon className={classes.icon}>
                                    <img alt="/affiliate" className={classes.iconImage} src="https://cdn4.iconfinder.com/data/icons/marketing-and-digital-marketing-1/32/business_marketing_advertising_affiliate_marketing-512.png" />
                                </ListItemIcon>
                                <ListItemText className={classes.primary} inset primary={globalVariables.LABEL_AFFILIATE[globalVariables.LANG]}/>
                                {this.state.affiliateOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>:null
                            
                        }
                        {isAffiliate?
                            <Collapse in={this.state.affiliateOpen} timeout="auto" unmountOnExit>
                                <Link to="/affiliate/dashboard" className={classes.link}>
                                    <MenuItem className={classes.nested}>
                                        <ListItemIcon className={classes.icon}>
                                            <DashboardIcon />
                                        </ListItemIcon>
                                    <ListItemText className={classes.primary} inset primary={globalVariables.SETTINGS_SECTION_DASHBOARD[globalVariables.LANG]} /> 
                                    </MenuItem>
                                </Link>
                                <Link to="/affiliate/linkgenerator" className={classes.link}> 
                                    <MenuItem className={classes.nested}>
                                        <ListItemIcon className={classes.icon}>
                                            <LinkIcon />
                                        </ListItemIcon>
                                        <ListItemText className={classes.primary} inset primary={globalVariables.SETTINGS_SECTION_LINK_GENERATOR[globalVariables.LANG]} />
                                    </MenuItem>
                                </Link>
                                <Link to="/affiliate/tree" className={classes.link}>
                                    <MenuItem className={classes.nested}>
                                        <ListItemIcon className={classes.icon}>
                                            <PeopleIcon />
                                        </ListItemIcon>
                                        <ListItemText className={classes.primary} inset primary={globalVariables.SETTINGS_SECTION_TEAM_TREE[globalVariables.LANG]} /> 
                                    </MenuItem>
                                </Link>
                            </Collapse>:null
                        }
                        {!isAffiliate?
                            <Link to="/affiliate" className={classes.link}>
                                <MenuItem className={classes.menuItemList}>
                                    <ListItemIcon className={classes.icon}>
                                        <img alt="affiliate" className={classes.iconImage} src="https://cdn4.iconfinder.com/data/icons/marketing-and-digital-marketing-1/32/business_marketing_advertising_affiliate_marketing-512.png" />
                                    </ListItemIcon>
                                    <ListItemText className={classes.primary} inset primary={globalVariables.SETTINGS_SECTION_AFFILIATE[globalVariables.LANG]} /> 
                                </MenuItem>
                            </Link>:null
                        }
                        {isSeller?
                            
                            <ListItem button onClick={this.handleSellerOpen}>
                                    <ListItemIcon className={classes.icon}>
                                        <img alt="/seller" className={classes.iconImage} src="data:image/jpeg;base64,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" />
                                    </ListItemIcon>
                                    <ListItemText className={classes.primary} inset primary={globalVariables.LABEL_SELLER[globalVariables.LANG]} /> 
                                    {this.state.sellerOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>:null
                        }
                        {isSeller?
                            <Collapse in={this.state.sellerOpen} timeout="auto" unmountOnExit>
                                <Link to="/seller/dashboard" className={classes.link}>
                                    <MenuItem className={classes.nested}>
                                        <ListItemIcon className={classes.icon}>
                                            <DashboardIcon />
                                        </ListItemIcon>
                                    <ListItemText className={classes.primary} inset primary={globalVariables.SETTINGS_SECTION_SELLING_DASHBOARD[globalVariables.LANG]} /> 
                                    </MenuItem>
                                </Link>
                                <Link to="/seller/my-products" className={classes.link}>
                                    <MenuItem className={classes.nested}>
                                        <ListItemIcon className={classes.icon}>
                                            <NotesIcon />
                                        </ListItemIcon>
                                    <ListItemText className={classes.primary} inset primary={globalVariables.SETTINGS_SECTION_MY_PRODUCTS[globalVariables.LANG]} /> 
                                    </MenuItem>
                                </Link>
                                <Link to="/seller/waiting-orders" className={classes.link}>
                                    <MenuItem className={classes.nested}>
                                        <ListItemIcon className={classes.icon}>
                                            <FontAwesomeIcon className={classes.fontawesomeIcon} icon="clipboard-check" />
                                        </ListItemIcon>
                                    <ListItemText className={classes.primary} inset primary={globalVariables.SETTINGS_SECTION_SELLING_ORDERS[globalVariables.LANG]} /> 
                                    </MenuItem>
                                </Link>
                                <Link to="/seller/add-product" className={classes.link}>
                                    <MenuItem className={classes.nested}>
                                        <ListItemIcon className={classes.icon}>
                                            <FontAwesomeIcon className={classes.fontawesomeIcon} icon="plus" />
                                        </ListItemIcon>
                                    <ListItemText className={classes.primary} inset primary={globalVariables.SETTINGS_SECTION_ADD_PRODUCTS[globalVariables.LANG]} /> 
                                    </MenuItem>
                                </Link>
                            </Collapse>:null
                        }
                        {!isSeller?
                            <Link to="/seller" className={classes.link}>
                                <MenuItem className={classes.menuItem}>
                                    <ListItemIcon className={classes.icon}>
                                        <img alt="seller" className={classes.iconImage} src="data:image/jpeg;base64,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" />
                                    </ListItemIcon>
                                    <ListItemText className={classes.primary} inset primary={globalVariables.SETTINGS_SECTION_SELLER[globalVariables.LANG]} /> 
                                </MenuItem>
                            </Link>:null
                        }
                        <Divider />

                        <LogoutButton handleRedirect={() => this.handleRedirect(this.props)}>
                            <MenuItem className={classes.menuItem}>
                                <ListItemIcon className={classes.icon}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText className={classes.primary} inset primary={globalVariables.SETTINGS_SECTION_SIGN_OUT[globalVariables.LANG]} /> 
                            </MenuItem>
                        </LogoutButton>
                    </MenuList>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        program: state.user.program,
        isLoading: state.user.isLoading
    }
  }
  
  
export default withRouter(connect(mapStateToProps)(withStyles(styles)(SettingsSection)));