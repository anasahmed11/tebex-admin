import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, } from '@material-ui/core';

import {orderAPI} from '../../../api/api'

import { ClipLoader } from 'react-spinners';
import { Link, } from 'react-router-dom';

import Order from '../parts/Order';
import globalVariables from '../../../global-variables';

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
                    <Typography gutterBottom component='h1' variant='display1' className={classes.textHead}>{globalVariables.LABEL_MY_ORDERS[globalVariables.LANG]}</Typography>
                </Grid>
                {isLoading?
                <Grid container alignItems="center" justify="center" >
                    <ClipLoader
                        sizeUnit={"px"}
                        size={75}
                        color={'#123abc'}
                        loading={isLoading}
                    />
                </Grid> : this.state.orders.length?
                this.state.orders.map(order =>
                    <Order order={order}/>    
                ):
                <Grid container alignItems="center" justify="center" style={{textAlign:'center',position:'relative', overflow:"hidden"}}>
                    <Grid itemxs={12}>
                        <Typography variant="h4" gutterBottom>{globalVariables.MY_ORDERS_EMPTY[globalVariables.LANG]}</Typography>
                        <Typography variant="h6">
                            {globalVariables.MY_ORDERS_VISIT_STORE[globalVariables.LANG]} <Link to='/shop'> {globalVariables.LABEL_HERE[globalVariables.LANG]}</Link>
                        </Typography>
                    </Grid>
                </Grid>
                }
            </Grid>
            
        );
    }
}


export default  withStyles(styles)(UserDashBoard);