import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, IconButton, } from '@material-ui/core';
import CustomMaterialTabl from '../parts/CustomMaterialTable';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cancelablePromise from '../../../Providers/CancelablePromise';
import { productsAPI } from '../../../api/api';

const styles = theme => ({
    root: {
        backgroundColor: 'white ',
        padding: `${theme.spacing(4)}px 0px`,
    },
    textHead: {
        fontWeight: '500',
        marginBottom: theme.spacing(4),
    },
});



const columns = [
    { title: 'Name', field: 'name' },
    { title: 'SKU', field: 'sku' },
    { title: 'Price', field: 'price', type: "numeric" },
    { title: 'Sale Price', field: 'sale_price', type: "numeric" },
    { title: 'Qunatity', field: 'quantity', type: "numeric" },
    { title: 'Created at', field: 'created_at' },
    { title: 'Action', field: 'action' },
]

class MyProdcuts extends React.Component {
    state = {
        products: [],
        isLoading: true,
    }

    pendingPromises = [];
    componentWillUnmount = () =>
        this.pendingPromises.map(p => p.cancel());
    appendPendingPromise = promise =>
        this.pendingPromises = [...this.pendingPromises, promise];
    removePendingPromise = promise =>
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);

    handleEditAction = (id) => {
        this.props.history.push(`/seller/edit-product/${id}`)
    }

    componentDidMount() {
        //data.map(item=>item.action = <IconButton onClick={()=>this.handleEditAction(item.id)}><FontAwesomeIcon icon="edit" /></IconButton> )

        const wrappedPromise = cancelablePromise(productsAPI.get('/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                res.data.map(item => {
                    item.created_at = new Date(item.created_at).toDateString("yyyy-MM-dd");
                    item.action = <IconButton onClick={() => this.handleEditAction(item.id)}><FontAwesomeIcon icon="edit" /></IconButton>
                })
                this.setState({ products: res.data, isLoading: false })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            })
        //this.setState({isLoading:false})
    }

    // handleEdit = (newData, oldData) => {
    //     console.log(oldData)
    // }

    render() {
        const { classes, } = this.props;
        const { isLoading } = this.state;
        return (
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>منتجاتي</Typography>
                </Grid>
                <Grid container item xs={12}>
                    {isLoading ?
                        <Grid container alignItems="center" justify="center" >
                            <ClipLoader
                                sizeUnit={"px"}
                                size={75}
                                color={'#123abc'}
                                loading={isLoading}
                            />
                        </Grid> :
                        <CustomMaterialTabl title={'منتجاتي'} /*onRowUpdatePromise={this.handleEdit}*/ data={this.state.products} columns={columns} />
                    }
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(MyProdcuts);