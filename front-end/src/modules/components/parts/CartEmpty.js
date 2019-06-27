import React from 'react';

import { Typography, Grid,   } from '@material-ui/core';
import { Link, } from 'react-router-dom';


function CartEmpty(){
    
    return(
        
        <Grid container justify="center" alignItems="center" spacing={16} xs={10} style={{textAlign:'center',position:'relative', overflow:"hidden"}}>
            <Grid item xs={11}>
                <Typography variant="h4" gutterBottom>لا يوجد منتجات في عربة التسوق</Typography>
                <Typography variant="h6">
                  يمكنك زيارة متجرنا واضافة بعض المنتجات من <Link to='/shop'> هنا</Link>
                </Typography>
            </Grid>
            
        </Grid>
            
        )
}


export default CartEmpty