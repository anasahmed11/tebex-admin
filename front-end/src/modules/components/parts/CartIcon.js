import React from 'react';
import { connect } from 'react-redux';
import { IconButton, withStyles, Badge } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import styles from '../../../assets/jss/components/parts/CartIcon';

function CartIcon(props){
    const { classes, itemsCnt } = props;
    return <IconButton 
            aria-label="Cart" 
            color="inherit" 
            onClick={() => props.history.push('/cart',{pathname:'http://localhost:3000'})}
            >
                <Badge 
                    badgeContent={itemsCnt} 
                    color="primary" 
                    classes={{ badge: classes.badge }}
                >
                    <ShoppingCart />
                </Badge>
        </IconButton>
}

const mapStateToProps = state => {
    return {
        itemsCnt: state.cart.numItems
    }
}

export default connect(mapStateToProps)(withStyles(styles)(CartIcon))