import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import globalVariables from '../../../global-variables';
import uuid from 'uuid';

import { withStyles } from '@material-ui/core/styles';
import { Snackbar, Grid } from '@material-ui/core';

import { productsAPI, categoryAPI } from '../../../api/api';

import MySnackbar from '../parts/MySnackbar';
import FiltersPanel from "../parts/FiltersPanel";
import ProductCard from "../parts/ProductCard";
import SelectMenu from "../parts/SelectMenu";

import { deleteFromCart, cartFinish } from '../../../store/actions/shoppingCart';

import { styles } from '../../../assets/jss/components/wrappers/ProductsListWrapper.jsx';

const flattenObject = (obj, _objects=[]) => {
    let {children, ...currentObject} = obj;
    _objects.push(currentObject);
	for (let child of children)
        flattenObject(child, _objects);
	return _objects;
};

class Store extends Component {
  
    state = {
        products: [],
        filterPanels: null,
        categoryID: -1,
    }

    componentDidMount(){
        categoryAPI.get('/')
        .then(res => {
            const categories = flattenObject(res.data[0]);
            const idx = categories.findIndex(category => category.slug === this.props.match.params.slug);
            if(idx > -1)
                this.setState({ id: categories[idx].id });
            this.setState({ categories: categories, });
            
            const api = this.state.id? categoryAPI : productsAPI;
            const route = this.state.id? this.state.id + '/products' : '';
            api.get(`/${route}`)
            .then(res => {
                const products = [];
                for (let item of res.data){
                    let link = item.images[0];
                    for(let i=0; i<8; i++)
                    products.push({
                        id: item.id,
                        img: link,
                        slug: item.slug,
                        title: item.name,
                        price: item.price,
                        salePrice: item.sale_price,
                    });
                }
                this.setState({
                    products: products,
                })
            })
            .catch(res => {
                console.log('SHOP ERR', res)
            }) 
            if(this.state.categoryID > -1)
                categoryAPI.get(`/${this.state.categoryID}/specs`)
                .then(res => {
                    this.setState({
                        filterPanels: res.data
                    })
                })
        })
        .catch(res => {
            console.log(res)
        })
    }


    render(){
    
    const { classes, isPopup, serverMessage, handlePopupClose, handleDeleteFromCart, messageType } = this.props

    let products = this.state.products.map(product => 
        <Grid key={uuid()} md={4} sm={6} xs={12}>
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
            <ProductCard
                product={product}
                id={product.id}
                title={product.title}
                price={product.salePrice? product.salePrice : product.price}
                oldPrice={product.salePrice? product.price : false}
                currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]}
                img={product.img}
                flex
            />
        </Grid>
    )

    return <Grid container className={classes.root}>
                <Grid md={3} sm={12}>
                    <FiltersPanel filterPanels={this.state.filterPanels} />
                </Grid>
                <Grid md={9} sm={12}>
                    <SelectMenu />
                    <div className={classes.productsSection}>
                        {products.length? products : globalVariables.LABEL_NO_PRODUCTS[globalVariables.LANG]}
                    </div>
                </Grid>
            </Grid>
    }
}

const mapStateToProps = state => {
    return {
        isPopup: state.cart.popup,
        isLoading:state.cart.isLoading,
        serverMessage:state.cart.message,
        messageType: state.cart.messageType
    }
}

const mapDispatchToProps = dispatch => {
    return{
        handleDeleteFromCart: (id,shopping_cart) => dispatch(deleteFromCart(id,shopping_cart)),
        handlePopupClose: () => dispatch(cartFinish()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Store)));