import React from 'react';
import { connect } from 'react-redux';
import { IconButton, withStyles, Badge } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import styles from '../../../assets/jss/components/parts/CartIcon';

function CartIcon(props){
    const { classes, itemsCnt } = props;
    const icon =  <Badge 
                badgeContent={itemsCnt} 
                color="primary" 
                classes={{ badge: classes.badge }}
            >
                <ShoppingCart />
            </Badge>
    return props.iconOnly? icon:<IconButton 
            aria-label="Cart" 
            color="inherit" 
            onClick={() => props.history.push('/cart',{pathname:'http://localhost:3000'})}
            >
            {icon}
        </IconButton>
}

const mapStateToProps = state => {
    return {
        itemsCnt: state.cart.numItems
    }
}

export default connect(mapStateToProps)(withStyles(styles)(CartIcon))