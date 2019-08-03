import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography,  } from '@material-ui/core';

import CustomMaterialTable from '../parts/CustomMaterialTable';


const styles = theme => ({
    root: {
      backgroundColor: 'white ',
      padding: `${theme.spacing(4)}px 0px`,
    },
    textHead:{
        fontWeight:'500',
        marginBottom: theme.spacing(4),
    },
});

const data = [
    { name: 'Abdo Hamdy', id: 1 , earning: 25 },
    { name: 'Abdo Tarek ', id: 2 , earning: 100 },
    { name: 'Ahmed Bally', id: 3 , earning: 100 },
    { name: 'Ahmed Mekkey', id: 4 , earning: 50 },
    { name: 'Mahmoud', id: 5, parentId:1 , earning: 12 },
    { name: 'Zakaria', id: 6, parentId:2 , earning: 5 },
  ]
const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Earning', field: 'earning' },

  ]
class UserDashBoard extends React.Component{
    state ={
    }

    render(){
        const {classes, } = this.props;
        
        return(
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>فريقي</Typography>
                </Grid>
                <Grid container item xs={12}>
                    <CustomMaterialTable data={data} columns={columns} tree={true}/>
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(UserDashBoard);