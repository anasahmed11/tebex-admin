import React from 'react';
import { IconButton, withStyles, Badge } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import {connect} from 'react-redux';

const styles = theme => ({
    badge: {
        top: '0%',
        right: -3,
        // The border color match the background color.
        border: `2px solid ${
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
        }`,
      },
});

function CartIcon(props){
    const { classes, itemsCnt } = props;

    return(
        <IconButton aria-label="Cart" color="inherit" onClick={() => props.history.push('/cart',{pathname:'http://localhost:3000'})} >
            <Badge 
                
                badgeContent={itemsCnt} 
                color="primary" classes={{ badge: classes.badge }}>
                <ShoppingCart />
            </Badge>
        </IconButton>

    );
}


const mapStateToProps = state => {
    return {
        itemsCnt: state.cart.numItems
    }
}




export default connect(mapStateToProps)(withStyles(styles)(CartIcon))