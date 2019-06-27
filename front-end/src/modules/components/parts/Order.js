import React from 'react';
import 'typeface-roboto';
import { 
    withStyles, 
    Grid, 
    Typography, 
    Paper,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import SelectMenu from "./SelectMenu";
import ShopCartItem from "./ShopCartItem";
import Stepper from "./Stepper";




const styles = theme => ({
    root: {
      padding:theme.spacing.unit * 2,
    },
    textHead:{
        fontWeight:'500'
    },
    textSection:{
        fontWeight:'500',
        fontSize:'13px',
        color:'rgb(100,100,100)',
    },
    orderInfoSection: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: theme.spacing.unit * 1,
    },
    orderInfoItem: {
        flex: '1 0 50%',
        [theme.breakpoints.down('sm')]: {
            flex: '1 0 100%',
        }
    },
});

const selectmenu = <Grid justify='flex-end' style={{display: 'flex', flexGrow: 1,}}>
    <SelectMenu />
</Grid>

function Order(props){
    const { order, classes } = props;
    
    return(
        <Grid component={Paper} container className={classes.root} justify='center' xs={12}>
                        
            <Grid item className={classes.orderInfoSection} xs={12}>
                <Typography gutterBottom className={classes.orderInfoItem}>رقم الطلب: #{order.id}</Typography>
                <Typography gutterBottom className={classes.orderInfoItem}>تاريخ الطلب: {order.created_at}</Typography>
                <Typography gutterBottom className={classes.orderInfoItem}>المشتري: {order.address.first_name +' '+ order.address.last_name}</Typography>
                <Typography gutterBottom className={classes.orderInfoItem}>حالة الطلب: {order.status}</Typography>
                <Typography gutterBottom className={classes.orderInfoItem}>
                    اجمالي السعر: {order.products.reduce((total, product) => total + product.price * product.quantity, 0) + order.shipping_fees}
                </Typography>
                <Typography gutterBottom className={classes.orderInfoItem}>
                    <Link to={`orders/${order.id}`}>تفاصيل الطلب</Link>
                </Typography>
            </Grid>
            
            <Grid container xs={11}>
                {order.products.map((item=>
                    <ShopCartItem key={item.id} item={item} previewOnly />
                ))}                                    
            </Grid>
            <Stepper steps={['انا', 'في', 'الساحة', 'واقف', 'لوحدي']} stepIndex={order.state} />
        </Grid>   

    );
}

export default withStyles(styles)(Order)
