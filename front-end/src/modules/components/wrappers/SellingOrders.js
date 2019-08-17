import React from 'react';
import { ClipLoader } from 'react-spinners';

import { withStyles, Grid, Typography, IconButton, Link,  } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'typeface-roboto';

import CustomMaterialTable from '../parts/CustomMaterialTable';
import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from '../../../assets/jss/components/wrappers/SellingOrders';
import { orderAPI } from '../../../api/api';

const data = [
    { id:1 ,name: 'Abdo Hamdy', id: 1 , earning: <IconButton><FontAwesomeIcon icon="edit" /></IconButton> },
    { id:2 ,name: 'Abdo Tarek ', id: 2 , earning: 100 },
    { id:3 ,name: 'Ahmed Bally', id: 3 , earning: 100 },
    { id:4 ,name: 'Ahmed Mekkey', id: 4 , earning: 50 },
    { id:5 ,name: 'Mahmoud', id: 5, parentId:1 , earning: 12 },
    { id:6 ,name: 'Zakaria', id: 6, parentId:2 , earning: 5 },
  ]

  const columns = [
    { title: 'Name', field: 'product.name' },
    { title: 'Price', field: 'price', type: "numeric" },
    { title: 'Qunatity', field: 'quantity', type: "numeric" },
    { title: 'Buyer Name', field: 'buyerName' },
    { title: 'Action', field: 'action' },
]


class SellingOrders extends React.Component{
    state ={
        isLoading: true,
        pendingProducts: [],
    }

    pendingPromises = [];
    componentWillUnmount = () =>
        this.pendingPromises.map(p => p.cancel());
    appendPendingPromise = promise =>
        this.pendingPromises = [...this.pendingPromises, promise];
    removePendingPromise = promise =>
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);


    handleConfirmAction = (data) => {
    }

    handleConfirmAction = () => {
    }
    
    componentDidMount(){

        const wrappedPromise = cancelablePromise(orderAPI('/seller-pending'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
        .then(res => {
            res.data.map(item => {
                item.buyerName = item.order.address.first_name + ' ' + item.order.address.last_name;
                item.product.name = <Link to={`/product/${item.product_id}`}>{item.product.name}</Link>
                item.action = <IconButton onClick={()=>this.handleConfirmAction({order_id:item.order_id, product_id:item.product_id})}><FontAwesomeIcon icon="check" /></IconButton>
            })
            this.setState({ pendingProducts: res.data, isLoading: false })
        })
        .then(() => this.removePendingPromise(wrappedPromise))
        .catch(err => {
            if (!err.isCanceled) {
                this.setState({ isLoading: false })
            }
        })


        data.map(item=>item.action = <IconButton onClick={()=>this.handleConfirmAction(item.id)}><FontAwesomeIcon icon="check" /></IconButton> )
        this.setState({isLoading:false})
    }

    render(){
        
        const { classes } = this.props;
        const { isLoading } = this.props;
        return(
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>اوردرات </Typography>
                </Grid>
                <Grid container spacing={2} item xs={12}>
                {isLoading?
                        <Grid container alignItems="center" justify="center" >
                            <ClipLoader
                                sizeUnit={"px"}
                                size={75}
                                color={'#123abc'}
                                loading={isLoading}
                            />
                        </Grid>: <React.Fragment>
                            <CustomMaterialTable data={this.state.pendingProducts} columns={columns} title={'الاوردرات المعلقة'} /*onRowUpdatePromise={this.handleEdit} data={data} columns={columns}*/ />
                            <CustomMaterialTable title={'الاودرات في الشحن'} /*onRowUpdatePromise={this.handleEdit} data={data} columns={columns}*/ />
                            <CustomMaterialTable title={'الاودرات المكتملة'} /*onRowUpdatePromise={this.handleEdit} data={data} columns={columns}*/ />
                        </React.Fragment>
                }
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SellingOrders);