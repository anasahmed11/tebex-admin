import React from 'react';
import 'typeface-roboto';
import {withStyles, Grid, Snackbar} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';


import ProductViewer from '../components/wrappers/ProductViewer';
import ProductSpecs from '../components/wrappers/ProductSpecs';
import AddToCart from '../components/parts/AddToCart';
import MySnackbar from '../components/parts/MySnackbar'

import { addToCart, cartFinish } from '../../store/actions/shoppingCart';

import {productsAPI} from '../../api/api'

const styles = theme => ({
    root: {
      backgroundColor: 'white ',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      textAlign:'center'
    },
});


class Product extends React.Component{
    state ={
        product:{},
        productSpecs:{},
        specs:{},
        productsSpecs:[],
        isLoading:true,
       
    }

    getSimilarProductSpecs = (id,sku) => {
        productsAPI.get(`${id}/${sku}/sku`)
        .then(res=>{
            
            let specs = {}
            res.data.forEach(product=>{
                product.specs.forEach(spec=>{
                    if(specs[spec.name]===undefined) specs[spec.name] = []
                    specs[spec.name].push(spec.value)
                })
            })
            console.log(specs)
            this.setState({
                specs:specs,
                productsSpecs:res.data,
            })
        })
        .catch(res=>{

        })
    }

    getProductSpecs = (id) => {
        productsAPI.get(`${id}/specs`)
        .then(res=>{
            
            let productSpecs = {}
            res.data.forEach(spec=>{
                productSpecs[spec.name] = spec.value
            })
            this.setState({productSpecs:productSpecs})
        })
        .catch(res=>{

        })
    }

    getProduct  = (id, withSimilars=false) => {
        productsAPI.get(`${id}`)
        .then(res=>{
           
            this.setState({
                product: res.data,
                isLoading: false,
            })
            
            if(withSimilars) this.getSimilarProductSpecs(id,res.data.sku)
        })
        .catch(res=>{

        })
        
    }
    componentDidMount(){
        const id = this.props.match.params.id
        this.getProduct(id, true);
        this.getProductSpecs(id);

    }
    handleAddToCart = (quantity) =>{

        this.props.handleAddToCart(this.state.product,quantity)
    }


    handleChange = (key,value) =>{
        this.setState({isLoading: true})
        let productSpecs = {...this.state.productSpecs};
        productSpecs[key] = value
        const idx = this.state.productsSpecs.findIndex(product=>{
            console.log(product)
            let flag = true;
            product.specs.forEach(spec=>{
                if(productSpecs[spec.name] !== spec.value) flag = false;
                console.log(spec)
            })
            console.log("flag:",flag)
            return flag
        })
        if(idx===-1){
            const product = {
                name: "",
                images: [],
                description: "",
                price: "",
                sale_price: "",
                quantity: 0,
                store: {
                    "id": 1,
                    "name": "",
                }
            }
            this.setState({
                product:product,
                productSpecs: productSpecs,
                isLoading:false
            })
            
        }
        else{
            const id = this.state.productsSpecs[idx].id
            this.getProduct(id)
            this.setState({
                productSpecs: productSpecs
            })
        }
    }
    render(){
        const {classes, isPopup, serverMessage, handlePopupClose, messageType } = this.props;
        const { specs, isLoading, product, productSpecs } = this.state;

        const tempImages = [ 
            "https://s3-us-west-1.amazonaws.com/react-package-assets/images/wristwatch_1033.jpg",
            "https://cf5.s3.souqcdn.com/item/2018/10/28/39/47/74/20/item_XL_39477420_157821992.jpg",
            "https://cf5.s3.souqcdn.com/item/2018/10/28/39/47/74/20/item_XL_39477420_157821992.jpg",
            "https://s3-us-west-1.amazonaws.com/react-package-assets/images/wristwatch_1033.jpg",
        ]
        return(
            <React.Fragment>
            {isLoading?
           
                <Grid container justify="center" alignItems="center" style={{height:'250px'}} className={classes.root2}>
                
                        <Grid container justify="center" >
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={75}
                                    color={'#123abc'}
                                    loading={isLoading}
                                />
                        </Grid>
                </Grid>:

                <Grid container justify='center' className={classes.root} spacing={2} style={{width: '100%',margin: '0'}}>

                    <Snackbar
                        style={{direction:'ltr', bottom:'50px'}}   
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={isPopup && serverMessage !== ""}
                        autoHideDuration={6000}
                        onClose={handlePopupClose}
                    >
                        <MySnackbar 
                            className={classes.margin}
                            onClose={handlePopupClose}
                            variant={messageType}
                            message={serverMessage}
                        />
                    
                    </Snackbar>

                    

                    <Grid item md={4} xs={8}>
                        <ProductViewer images={product.images.length ? product.images: tempImages } title={product.name}/>
                    </Grid>
                    <Grid item md={4} xs={8}>
                        <ProductSpecs 
                            specs={specs}
                            productSpecs={productSpecs} 
                            price={product.price} 
                            salePrice={product.sale_price} 
                            description={product.description}
                            handleChange={this.handleChange}
                        />

                    </Grid>
                    <Grid item md={3} xs={8}>
                        <AddToCart addToCart={this.handleAddToCart} quantity={product.quantity} store={{id:product.store.id, name:product.store.name}} />
                    </Grid>
                    
                </Grid>
            }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {

        isPopup: state.cart.popup,
        cartIsLoading:state.cart.isLoading,
        serverMessage:state.cart.message,
        messageType: state.cart.messageType
    }
}

const mapDispatchToProps = dispatch => {
    return{
        handleAddToCart: (product, quantity) => dispatch(addToCart(product, quantity)),
        handlePopupClose: () => dispatch(cartFinish()),
      }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Product)));