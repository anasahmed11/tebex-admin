import React from 'react';
import { Link, } from 'react-router-dom';
import globalVariables from '../../../global-variables';

import { Typography, Grid,   } from '@material-ui/core';

function MyOrdersEmpty(){
    return (
        <Grid
            container item
            justify="center"
            alignItems="center"
            spacing={2}
            xs={10}
            style={{textAlign:'center',position:'relative', overflow:"hidden", margin: 'auto'}}
        >
            <Grid item xs={11}>
                <Typography variant="h5" gutterBottom>{globalVariables.MY_ORDERS_EMPTY[globalVariables.LANG]}</Typography>
                <Typography variant="h6">
                  {globalVariables.MY_ORDERS_VISIT_STORE[globalVariables.LANG]} <Link to='/shop'> {globalVariables.LABEL_HERE[globalVariables.LANG]}</Link>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default MyOrdersEmpty;