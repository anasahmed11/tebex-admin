import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

import { withStyles, Grid, Snackbar, Typography } from '@material-ui/core';
import 'typeface-roboto';

import { Helmet } from "react-helmet";

import ProductViewer from '../components/wrappers/ProductViewer';
import ProductSpecs from '../components/wrappers/ProductSpecs';
import AddToCart from '../components/parts/AddToCart';
import MySnackbar from '../components/parts/MySnackbar'

import { addToCart, cartFinish } from '../../store/actions/shoppingCart';
import { productsAPI, categoryAPI, baseURL } from '../../api/api'

import styles from '../../assets/jss/views/Product';
import globalVariables from '../../global-variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const styles2 = (theme) => ({
    root: {
        padding: `${theme.spacing(12)}px 0px`,
        minHeight: '500px',
        position:'relative',
        textAlign:'center',
    },
});
const ProductNotFound = withStyles(styles2)(function ProductNotFound(props){
    const {classes} = props;
    return <Grid container justify='center' alignItems="center" className={classes.root}>
                <Grid item md={8} xs={10}>
                    <Grid container justify='center' spacing={3} alignItems="center">
                        <Grid item md={8} sm={10} xs={12} className={classes.paddingTop}>
                            <FontAwesomeIcon style={{width:'30%', height:'100%', color:'navy'}} icon={['fas', 'exclamation-circle']} />
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.paddingTop}>
                            <Typography style={{color:'#5D1F62'}} component="h2" variant="h3" gutterBottom >{globalVariables.PRODUCT_NOT_FOUND[globalVariables.LANG]}</Typography>
                            <Typography style={{color:'#5D1F62'}} component="h2" variant="h6" gutterBottom>{globalVariables.PRODUCT_NOT_FOUND_MESSAGE[globalVariables.LANG]}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
})




const flattenObject = (obj, _objects=[]) => {
    let {children, ...currentObject} = obj;
    _objects.push(currentObject);
	for (let child of children)
        flattenObject(child, _objects);
	return _objects;
};

const getCategoryID = (categories, slugs, id=1, lvl=0) => {
    if(!slugs) return 1; // Root category
    for(let category of categories)
        if(category.slug === slugs[lvl] && category.parent_id === id){
            if(lvl + 1 === slugs.length)
                return category.id;
            return getCategoryID(categories, slugs, category.id, lvl+1);
        }
    return -1; // 404
}


class Product extends React.Component {
    state = {
        product: {},
        productSpecs: {},
        specs: {},
        productsSpecs: [],
        isLoading: true,
        error: false,
    }

    // getSimilarProductSpecs = (id, sku) => {
    //     productsAPI.get(`${id}/${sku}/sku`)
    //         .then(res => {

    //             let specs = {}
    //             res.data.forEach(product => {
    //                 product.specs.forEach(spec => {
    //                     if (specs[spec.name] === undefined) specs[spec.name] = []
    //                     specs[spec.name].push(spec.value)
    //                 })
    //             })
    //             console.log(specs)
    //             this.setState({
    //                 specs: specs,
    //                 productsSpecs: res.data,
    //             })
    //         })
    //         .catch(res => {

    //         })
    // }

    // getProductSpecs = (id) => {
    //     productsAPI.get(`${id}/specs`)
    //         .then(res => {

    //             let productSpecs = {}
    //             res.data.forEach(spec => {
    //                 productSpecs[spec.name] = spec.value
    //             })
    //             this.setState({ productSpecs: productSpecs })
    //         })
    //         .catch(res => {

    //         })
    // }

    
    
    componentDidMount() {
        const id = this.props.match.params.id
        this.getProduct(id, true);
        //this.getProductSpecs(id);
        this.createCategoryRoute();

    }

    getProduct = (id, withSimilars = false) => {
        productsAPI.get(`${id}`)
            .then(res => {
                // res.data.images = res.data.images.map(image => (baseURL + image.slice(1)));
                this.setState({
                    product: res.data,
                    isLoading: false,
                    productSpecs: res.data.specs
                })

                //if (withSimilars) this.getSimilarProductSpecs(id, res.data.sku)
            })
            .catch(res => {
                this.setState({
                    isLoading:false,
                    error: true,
                })
            })

    }

    createCategoryRoute = () => {
        categoryAPI.get('/')
        .then(res => {
            // Find current category
            const categories = flattenObject(res.data[0]);
            this.traceCategory(categories, this.state.product.category_id);
        });
    }


    traceCategory = (categories, id, trace=[]) => {
        if(id === 1){
            if(trace.length < 1)
                return;
            trace.reverse()
            let traceArr = [];
            traceArr.push({
                id: 1,
                name: {en: 'Shop', ar: 'المتجر'},
                link: '/shop/',
            });
            for(let i=0; i<trace.length; i++){
                let link = '/shop/';
                for(let j=0; j<=i; j++) link = link + trace[j].slug + '/';
                traceArr.push({
                    id: trace[i].id,
                    name: {en: trace[i].name_en, ar: trace[i].name},
                    link: link,
                })
            }
            this.setState({ categoryTrace: traceArr });
            return;
        }
        for(let cat of categories)
            if(cat.id === id){
                trace.push(cat);
                this.traceCategory(categories, cat.parent_id, trace);
            }
    }

    handleAddToCart = (quantity) => {
        this.props.handleAddToCart(this.state.product, quantity)
    }


    handleChange = (key, value) => {
        this.setState({ isLoading: true })
        let productSpecs = { ...this.state.productSpecs };
        productSpecs[key] = value
        const idx = this.state.productsSpecs.findIndex(product => {
            console.log(product)
            let flag = true;
            product.specs.forEach(spec => {
                if (productSpecs[spec.name] !== spec.value) flag = false;
                console.log(spec)
            })
            console.log("flag:", flag)
            return flag
        })
        if (idx === -1) {
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
                product: product,
                productSpecs: productSpecs,
                isLoading: false
            })

        }
        else {
            const id = this.state.productsSpecs[idx].id
            this.getProduct(id)
            this.setState({
                productSpecs: productSpecs
            })
        }
    }
    render() {
        
        const { classes, isPopup, serverMessage, handlePopupClose, messageType } = this.props;
        const { specs, isLoading, product, productSpecs } = this.state;
        //console.log(productSpecs);
        
        return (
            <React.Fragment>
                <Helmet>
                    <title>{globalVariables.PAGE_TITLE_PRODUCT[globalVariables.LANG]}</title>
                </Helmet>
                {isLoading?
                    <Grid container justify="center"  alignItems="center" className={classes.loadingContainer} >
                        <ClipLoader
                            css={`margin: auto`}
                            sizeUnit={"px"}
                            size={75}
                            color={'#594589'}
                            loading={true}
                        />
                    </Grid>
                    :
                    <Grid container justify='center' className={classes.root} spacing={2}>
                         {this.state.error?
                        <ProductNotFound />
                        :
                        <React.Fragment>
                        <Snackbar
                            style={{ bottom: '50px' }}
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
                       
                      {this.state.categoryTrace?
                            <Grid item xs={11} className={classes.categoryTrace}>
                                {this.state.categoryTrace.map(cat =>
                                <Typography className={classes.categoryLinkElement} variant="subtitle1">
                                    <Link
                                        className={classes.categoryLink}
                                        to={cat.link}
                                    >
                                        {cat.name[globalVariables.LANG]}
                                    </Link>
                                </Typography>
                                )}
                            </Grid>
                        :null}

                        <Grid item lg={4} md={5} xs={11}>
                            <ProductViewer 
                                images={product.images}
                                title={product.name} />
                        </Grid>

                        <Grid item lg={4} md={6} xs={11}>
                            <ProductSpecs
                                title={product.name}
                                specs={specs}
                                productSpecs={productSpecs}
                                price={product.price}
                                salePrice={product.sale_price}
                                description={product.description}
                                handleChange={this.handleChange}
                            />
                        </Grid>

                        <Grid item lg={3} md={11} xs={11}>
                            <AddToCart addToCart={this.handleAddToCart} quantity={product.quantity} store={{ id: product.store.id, name: product.store.name }} />
                        </Grid>
                    </React.Fragment>}
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {

        isPopup: state.cart.popup,
        cartIsLoading: state.cart.isLoading,
        serverMessage: state.cart.message,
        messageType: state.cart.messageType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleAddToCart: (product, quantity) => dispatch(addToCart(product, quantity)),
        handlePopupClose: () => dispatch(cartFinish()),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Product)));