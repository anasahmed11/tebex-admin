import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography,  } from '@material-ui/core';


const styles = theme => ({
    root: {
      backgroundColor: 'white ',
      padding: `${theme.spacing(4)}px 0px`,
    },
    textHead:{
        fontWeight:'500'
    },
});

class SellingOrders extends React.Component{
    state ={
    }

    render(){
        const {classes, } = this.props;
        
        return(
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>اوردرات</Typography>
                </Grid>
                <Grid container item xs={12}>
                   
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(SellingOrders);