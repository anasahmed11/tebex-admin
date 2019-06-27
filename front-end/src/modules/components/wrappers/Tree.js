import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography,  } from '@material-ui/core';

import Table from '../parts/Table';


const styles = theme => ({
    root: {
      backgroundColor: 'white ',
      padding: `${theme.spacing.unit * 4}px 0px`,
    },
    textHead:{
        fontWeight:'500'
    },
});

class UserDashBoard extends React.Component{
    state ={
    }

    render(){
        const {classes, } = this.props;
        
        return(
            <Grid container justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='display1' className={classes.textHead}>فريقي</Typography>
                </Grid>
                <Grid container xs={12}>
                    <Table />
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(UserDashBoard);