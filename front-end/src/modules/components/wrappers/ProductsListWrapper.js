import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
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
import { isArray } from "util";
import { ClipLoader } from "react-spinners";

const flattenObject = (obj, _objects=[]) => {
    let {children, ...currentObject} = obj;
    _objects.push(currentObject);
	for (let child of children)
        flattenObject(child, _objects);
	return _objects;
};

const getCategoryID = (categories, slugs, id=1, lvl=0) => {
    if(!slugs) return -1;
    for(let category of categories)
        if(category.slug === slugs[lvl] && category.parent_id === id){
            if(lvl + 1 === slugs.length)
                return category.id;
            return getCategoryID(categories, slugs, category.id, lvl+1);
        }
}

const Loading = () => <Grid container justify="center" >
                        <ClipLoader
                            sizeUnit={"px"}
                            size={75}
                            color={'#123abc'}
                            loading={true}
                        />
                    </Grid>

class Store extends Component {
  
    state = {
        _isLoading: true,
        products: [],
        filterPanels: null,
        id: 1, // Category id, 1 is a needed initial value.
    }

    componentDidMount(){
        const slug = this.props.match.params.slug? this.props.match.params.slug.split('/') : null;
        categoryAPI.get('/')
        .then(res => {
            const categories = flattenObject(res.data[0]);
            const slugToID = getCategoryID(categories, slug);
            const idx = slugToID? categories.findIndex(category => category.id === slugToID) : -1;

            if(isArray(slug)){
                this.setState({ id: idx > -1? categories[idx].id : 0, categories: categories });
                if(!this.state.id) {
                    this.setState({_isLoading: false})
                };
            }
            else
                this.setState({ id: -1, categories: categories }); // ALL
            
            // Products from a *Category* : *All Products*
            const api = this.state.id > -1? categoryAPI : productsAPI;
            const route = this.state.id > -1? this.state.id + '/products' : '';
            api.get(`/${route}`)
            .then(res => {
                const products = [];
                for (let item of res.data){
                    let link = item.images[0];
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
            .catch(res => console.log('ERROR FETCHING PRODUCTS', res));

            if(this.state.id > -1)
                categoryAPI.get(`/${this.state.id}/specs`)
                .then(res => {
                    this.setState({
                        filterPanels: res.data
                    })
                    this.setState({ _isLoading: false });
                })
                .catch(res => console.log('ERROR FETCHING A CATEGORY SPECS', res));
        })
        .catch(res => console.log('ERROR FETCHING CATEGORIES', res))
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
    console.log('ID IN STATE:', this.state.id)
    return this.state._isLoading? <Loading />
            : this.state.id?  
            <Grid container className={classes.root}>
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
            : <Redirect to = '/404' /> 
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