import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, } from '@material-ui/core';

import {orderAPI} from '../../../api/api'

import { ClipLoader } from 'react-spinners';

import Order from '../parts/Order';

const styles = theme => ({
    root: {
      backgroundColor: 'white ',
      padding: `${theme.spacing.unit * 4}px 0px`,
    },
    textHead:{
        fontWeight:'500',
        marginBottom: theme.spacing.unit * 4,
    },
    image:{
        width: '50%',
        maxHeight:'200px',
    },
    textSection:{
        fontWeight:'500',
        fontSize:'13px',
        color:'rgb(100,100,100)',
    },
});

class UserDashBoard extends React.Component{
    state ={
        orders:[],
        isLoading:true
    }

    componentDidMount(){
        orderAPI.get('/')
        .then(res=>{
            this.setState({orders:res.data,isLoading:false})
        })
        .catch(res=>{
            this.setState({isLoading:false})
        })
    }
    render(){
        const {classes } = this.props;
        const { isLoading } = this.state
        return(
            <Grid container justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='display1' className={classes.textHead}>مشترياتي</Typography>
                </Grid>
                {isLoading?
                <Grid container alignItems="center" justify="center" >
                    <ClipLoader
                        sizeUnit={"px"}
                        size={75}
                        color={'#123abc'}
                        loading={isLoading}
                    />
                </Grid> :
                this.state.orders.map(order =>
                    <Order order={order}/>    
                )}
            </Grid>
            
        );
    }
}


export default  withStyles(styles)(UserDashBoard);