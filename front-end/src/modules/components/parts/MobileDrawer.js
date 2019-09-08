import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from 'react-router-dom';

import styles from '../../../assets/jss/components/parts/MobileDrawer';
import Cookies from 'universal-cookie';
import ProfileAvatar from './ProfileAvatar';
import { AccountCircle, ExpandLess, ExpandMore } from '@material-ui/icons';
import globalVariables, { FOLLOW_US } from '../../../global-variables';
import { categoryAPI } from '../../../api/api';
import { Collapse, Typography } from '@material-ui/core';
import IconLink from './IconLink';

const cookies = new Cookies();

class BannersDrawer extends React.Component {
    state = {
        dir: 'right',
        categories: []
    };
    handleCatClick = (name) =>
        this.setState({ [name]: !this.state[name] });


    componentDidMount() {
        let en = globalVariables.LANG === 'en';

        categoryAPI.get('/')
            .then(res => {
                const categories = [];
                let mainCategories = res.data[0].children;
                for (let mainCat of mainCategories) {
                    const subs = [];
                    for (let subCat of mainCat.children) {
                        const leaves = [];
                        for (let leafCat of subCat.children) {
                            leaves.push({
                                id: leafCat.id,
                                name: en ? leafCat.name_en : leafCat.name,
                                subtitle: en ? leafCat.name_en : leafCat.name,
                                slug: leafCat.slug,
                            });
                        }
                        subs.push({
                            id: subCat.id,
                            name: en ? subCat.name_en : subCat.name,
                            subtitle: en ? subCat.name_en : subCat.name,
                            slug: subCat.slug,
                            children: leaves,
                        });
                    }
                    categories.push({
                        id: mainCat.id,
                        name: en ? mainCat.name_en : mainCat.name,
                        subtitle: en ? mainCat.name_en : mainCat.name,
                        slug: mainCat.slug,
                        children: subs,
                    });
                }
                this.setState({
                    categories: categories,
                    isLoading: false,
                })
            })
            .catch(res => {
                console.log(res)
            })
    }

    closeHandlerWrapper = (callBacks = [], close = true) => {
        for (let callBack of callBacks)
            if (callBack)
                callBack();
        if (close) this.props.closeHandler();
    }

    render() {
        const { classes } = this.props;
        const authenticated = cookies.get('access_token') !== undefined
        const sideList = (
            <div className={classes.list}>
                <List>
                    {this.props.upperLinks.map((item, idx) => (
                        <ListItem button to={item.link} component={Link} onClick={() => this.closeHandlerWrapper([item.onClick])} key={idx}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem button to={authenticated ? '/profile' : '/auth?type=login'} onClick={() => this.closeHandlerWrapper()} component={Link}>
                        <ListItemIcon>{authenticated ? <ProfileAvatar style={{ fontSize: '16px' }} /> : <AccountCircle />}</ListItemIcon>
                        <ListItemText primary={authenticated ? globalVariables.PROFILE_TITLE[globalVariables.LANG] : globalVariables.SETTINGS_SECTION_LOGIN[globalVariables.LANG]} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {this.props.bottomLinks.map((item, idx) => (
                        <ListItem button to={item.link} component={Link} onClick={() => this.closeHandlerWrapper([item.onClick])} key={idx}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {
                    this.state.categories.map((cat, idx) =>
                        <List key={idx}>
                            <ListItem button onClick={() => this.handleCatClick(cat.slug)}>
                                <ListItemText primary={cat.name} />
                                {this.state[cat.slug] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>


                            <Collapse in={this.state[cat.slug]} timeout="auto" unmountOnExit>
                                <List>
                                    {cat.children.map((childCat, idx) =>
                                        <ListItem button to={`/shop/${cat.slug}`} onClick={() => this.closeHandlerWrapper()} component={Link} key={idx}>
                                            <ListItemText primary={childCat.name} />
                                        </ListItem>
                                    )}
                                </List>
                            </Collapse>
                        </List>
                    )
                }
                <Divider />
                <List>
                  
                    <ListItem button component={Link}>
                        <ListItemText primary={globalVariables.lang === 'en'? 'FOLLOW US' : 'تابعنا'} />
                    </ListItem>
                    <ListItem button component={Link} >
                        {
                            FOLLOW_US.map((item, idx)=>
                                <Typography key={idx} variant='subtitle1' display="inline">
                                    <IconLink icon={item.icon}  href={item.link}/>
                                </Typography> 
                            )
                        }
                        
                    </ListItem>
                </List>
                <Divider />
            </div>
        );

        return (
            <div>
                <Drawer anchor={this.state.dir} open={this.props.open} onClose={this.props.closeHandler}>
                    <div
                        tabIndex={0}
                        role="button"
                    // onClick={this.props.closeHandler}
                    // onKeyDown={this.props.closeHandler}
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
