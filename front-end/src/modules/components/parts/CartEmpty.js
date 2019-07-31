import React from 'react';

import { Typography, Grid,   } from '@material-ui/core';
import { Link, } from 'react-router-dom';
import globalVariables from '../../../global-variables';


function CartEmpty(){
    
    return(
        
        <Grid container item justify="center" alignItems="center" spacing={16} xs={10} style={{textAlign:'center',position:'relative', overflow:"hidden"}}>
            <Grid item xs={11}>
                <Typography variant="h4" gutterBottom>{globalVariables.CART_EMPTY[globalVariables.LANG]}</Typography>
                <Typography variant="h6">
                  {globalVariables.CART_VISIT_STORE[globalVariables.LANG]} <Link to='/shop'> {globalVariables.LABEL_HERE[globalVariables.LANG]}</Link>
                </Typography>
            </Grid>
            
        </Grid>
            
        )
}


export default CartEmpty