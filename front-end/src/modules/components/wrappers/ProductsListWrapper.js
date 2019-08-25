import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';
import Scroll from 'react-scroll';
import globalVariables from '../../../global-variables';
import uuid from 'uuid';

import { ClipLoader } from "react-spinners";
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, Grid, Typography } from '@material-ui/core';

import { categoryAPI } from '../../../api/api';

import MySnackbar from '../parts/MySnackbar';
import FiltersPanel from "../parts/FiltersPanel";
import ProductCard from "../parts/ProductCardX";
import SelectMenu from "../parts/SelectMenu";
import Pagination from "../parts/Pagination";

import { cartFinish } from '../../../store/actions/shoppingCart';

import styles from '../../../assets/jss/components/wrappers/ProductsListWrapper.jsx';

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


const Loading = (props) => <Grid container justify="center" style={{height: props.height}} >
                        <ClipLoader
                            css={`margin: auto`}
                            sizeUnit={"px"}
                            size={75}
                            color={'#594589'}
                            loading={true}
                        />
                    </Grid>

class Store extends Component {

    state = {
        _isLoading: true,
        _isLoadingProducts: true,
        products: [],
        slug: null,
        filterPanels: null,
        categoryID: 1,
        totalPages: 1,
        query: {},
        keepHeight: '40vh',
    }
    
    queryParseOptions = {
        arrayFormat: 'bracket',
        parseBooleans: true,
        parseNumbers: true,
    }

    sortValues = [
        'Newest',
        'Highest Price',
        'Lowest Price',
        'A-Z',
        'Z-A'
    ];

    perPageValues = ['30', '50', '75'];
    
    componentDidMount = () => {
        // Parse url after "shop/"
        const slug = this.props.match.params.slug? this.props.match.params.slug.split('/') : null;
        const query = queryString.parse(window.location.search, this.queryParseOptions);
        
        // Inital values
        if(!query.page) query.page = 1;
        if(!query.sort) query.sort = 0;
        if(!query.perPage) query.perPage = 30;
        if(!query.minPrice) query.minPrice = 0;
        if(!query.maxPrice) query.maxPrice = 9999;
        
        console.log('ShopDidMount Query:', query);
        this.setState({ slug: slug, query: query }, () => this.fetchAllData());
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

    updateURLQuery = (searchString, documentTitle) => {
        documentTitle = typeof documentTitle !== 'undefined' ? documentTitle : document.title;
        let urlSplit = ( window.location.href ).split("?");
        let url = searchString? urlSplit[0] + '?' + searchString : urlSplit[0];
        let obj = { title: documentTitle, url: url };
        window.history.pushState(obj, obj.title, obj.url);
    }

    fetchAllData = () => {
        
        const { slug } = this.state;

        categoryAPI.get('/')
        .then(res => {
            // Find current category
            const categories = flattenObject(res.data[0]);
            const categoryID = getCategoryID(categories, slug);
            if(categoryID === -1){
                this.setState({ _isLoading: false, categoryID: -1 });
                return;
            }
            this.setState({ 
                categoryID: categoryID,
                categories: categories,
                slug: slug
            }, () => {
                this.traceCategory(categories, categoryID);
                this.fetchProducts();
                this.fetchFilters();
            });
        })
        .catch(res => console.log('ERROR: Fetching categories failed.', res))
    }

    fetchProducts = () => {

        // Get products of current category for current page
        const { categoryID, query } = this.state;

        categoryAPI.get(`/${categoryID}/products?page=${query.page}`)
        .then(res => {
            const products = [];
            for (let item of res.data.data)
                products.push({
                    id: item.id,
                    img: item.images[0],
                    slug: item.slug,
                    title: {ar: item.name, en: item.name_en},
                    price: item.price,
                    salePrice: item.sale_price,
                });
            this.setState({ 
                products: products,
                totalPages: Math.ceil(res.data.total/ res.data.per_page),
                _isLoadingProducts: false,
            });
        })
        .catch(res => console.log(`ERROR: Fetching products [/${categoryID}/products]`, res));
    }

    fetchFilters = () => {
        
        const { categoryID, categories, slug, query } = this.state;

        categoryAPI.get(`/${categoryID}/specs/count`)
            .then(res => {

                // Initiate filterPanels with categories
                const filterPanels = [{
                    id: '__category',
                    name: 'category',
                    values: [],
                    type: 'link',
                }];
                
                try {
                    for(let cat of categories)
                        if(cat.parent_id === categoryID)
                            filterPanels[0].values.push({
                                slug: slug? slug.join('/') + '/' + cat.slug : cat.slug,
                                name: {ar: cat.name, en: cat.name_en}
                            });
                } catch (err) { console.log('WARNING: Failed to fetch sub-categories.\n', err) }

                // Add specs to filterPanels
                try {
                    const specsObject = res.data.data;
                    for(let specName of Object.getOwnPropertyNames(specsObject)){
                        const specValues = Object.getOwnPropertyNames(specsObject[specName]);
                        const name = specName.toLowerCase(); 
                        const filter = {
                            id: `_${name}`,
                            name: name,
                            values: [], // Can be done by map function
                            type: 'menu',
                        }
                        for(let value of specValues)
                            filter.values.push([value, false]);
                        
                        filterPanels.push(filter);
                    }
                } catch (err) { console.log('WARNING: Filters processing failed.\n', err); }
                
                filterPanels.push({
                    id: '__price',
                    name: 'price',
                    values: [0, 9999],
                    type: 'text',
                });
                
                this.setState({
                    filterPanels: filterPanels,
                }, () => this.updateFilters());
            })
            .catch(res => console.log('ERROR: Fetching specs failed.', res));
    }

    updateFilters = () => {
        try {
            const { filterPanels, query } = this.state;

            // Section 1
            for(let filter of filterPanels){
                if(filter.type !== 'menu')
                    continue;
                for(let i=0; i<filter.values.length; i++){
                    if(Array.isArray(query[filter.name]) && query[filter.name].findIndex(v => v === filter.values[i][0]) > -1)
                        filter.values[i][1] = true;
                    else
                        filter.values[i][1] = false;
                }
            }
            this.setState({
                filterPanels: filterPanels,
                _isLoading: false,
                _isLoadingProducts: false,
            });
            /*
            // Section 2: If you use this section instead, u need to pass filterName and value

            let filterIndex = filterPanels.findIndex(f => f.name === filterName);
            let valueIndex = filterIndex > -1? filterPanels[filterIndex].values.findIndex(v => v[0] === value) : -1;
            if(valueIndex === -1){
                this.setState({ _isLoadingProducts: false, });
                return;
            }
            console.log('update', query);
            if(Array.isArray(query[filterName]) && query[filterName].findIndex(v => v === value) > -1)
                filterPanels[filterIndex].values[valueIndex][1] = true;
            else
                filterPanels[filterIndex].values[valueIndex][1] = false;
            this.setState({
                filterPanels: filterPanels,
                _isLoadingProducts: false,
            });*/
        } catch (err) { console.log('WARNING: Filters update failed.\n', err); }
    }
    
    filterCheckHandler = (id, value) => {
        const query = this.state.query;
        if(!query[id]){
            query[id] = [];
            query[id].push(value);
        }
        else{
            if(query[id].findIndex(v => v === value) > -1)
                query[id].splice(query[id].findIndex(v => v === value), 1);
            else
                query[id].push(value);
        }
        let keepHeight =  document.getElementById('filters-panel').children[0].offsetHeight;
        this.setState({ keepHeight: keepHeight, query: query, _isLoadingProducts: true }, () => {
            this.updateURLQuery(queryString.stringify(query, this.queryParseOptions));
            this.updateFilters();
        });
        // this.updateFilters(id, value);
    }

    paginationHandler = (page) => {
        const query = this.state.query;
        query.page = page.selected + 1;
        let scrollHeight = document.getElementsByClassName(this.props.classes.productsSection)[0].offsetTop;
        let keepHeight =  document.getElementById('filters-panel').children[0].offsetHeight;
        let scroll = Scroll.animateScroll;
        scroll.scrollTo(scrollHeight, {smooth: true});
        this.setState({
            query: query,
            keepHeight: keepHeight,
            _isLoadingProducts: true,
        }, () => {
            this.updateURLQuery(queryString.stringify(query, this.queryParseOptions));
            this.fetchProducts();
        });
    }

    selectHandler = (menu, value) => {
        const { query } = this.state;
        if(menu === 'sort')
            query.sort = this.sortValues.findIndex(v => v === value);
        if(menu === 'perPage')
            query.perPage = value;
        this.setState({
            query: query,
            _isLoadingProducts: true,
        }, () => {
            this.updateURLQuery(queryString.stringify(query, this.queryParseOptions));
            this.fetchProducts();
        });
    }

    priceHandler = () => {
        const { query } = this.state;
        let minValue = document.getElementById('price-min-input').value;
        let maxValue = document.getElementById('price-max-input').value;
        query.minPrice = minValue;
        query.maxPrice = maxValue;
        let keepHeight =  document.getElementById('filters-panel').children[0].offsetHeight;
        this.setState({
            keepHeight: keepHeight,
            query: query,
            _isLoadingProducts: true,
        }, () => {
            this.updateURLQuery(queryString.stringify(query, this.queryParseOptions));
            this.fetchProducts();
        });
    }

    render(){
        const { classes, isPopup, serverMessage, handlePopupClose, messageType } = this.props;
        const { 
            _isLoading,
            _isLoadingProducts,
            query,
            products,
            categoryID,
            keepHeight,
            filterPanels,
            totalPages
        } = this.state;

        const qString = queryString.stringify(query, this.queryParseOptions);

        const snack = <Snackbar
                            style={{bottom:'50px'}}   
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

        let Products = products.map(product => 
            <Grid key={uuid()} md={4} sm={6} xs={12}>
                    <ProductCard
                        id={product.id}
                        title={product.title[globalVariables.LANG]}
                        price={product.salePrice? product.salePrice : product.price}
                        oldPrice={product.salePrice? product.price : false}
                        currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]}
                        img={product.img}
                    /> 
            </Grid>
        )

        return _isLoading? <Loading height={keepHeight} />
                : categoryID > -1?  
                <Grid container className={classes.root}>
                    {snack}
                    <div className={classes.toolbar}>
                        <div className={classes.categoryTrace}>
                            {this.state.categoryTrace?
                                this.state.categoryTrace.map(cat =>
                                <Typography className={classes.categoryLinkElement} variant="subtitle1">
                                    <Link
                                        className={classes.categoryLink}
                                        to={qString? cat.link + '?q=' + qString : cat.link}
                                    >
                                        {cat.name[globalVariables.LANG]}
                                    </Link>
                                </Typography>)
                            :null}
                        </div>
                        <div className={classes.optionMenusSection}>
                            <SelectMenu 
                                name="sort"
                                sideLabel={globalVariables.LABEL_SHOP_SORT[globalVariables.LANG]}
                                values={this.sortValues}
                                handleChange={this.selectHandler} 
                                selectedValue={this.sortValues[query.sort]}
                                disabled={_isLoadingProducts}
                            />
                            <SelectMenu 
                                name="perPage"
                                sideLabel={globalVariables.LABEL_SHOP_PERPAGE[globalVariables.LANG]}
                                values={this.perPageValues}
                                handleChange={this.selectHandler} 
                                selectedValue={query.perPage}
                                disabled={_isLoadingProducts}
                            />
                        </div>
                    </div>
                    <Grid item container>
                        <React.Fragment>
                            <Grid item lg={3} xs={12}>
                                <FiltersPanel
                                    id='filters-panel'
                                    query={qString}
                                    handleCheck={this.filterCheckHandler}
                                    handlePrice={this.priceHandler}
                                    minBoxId='price-min-input'
                                    maxBoxId='price-max-input'
                                    defaultMin={query.minPrice}
                                    defaultMax={query.maxPrice}
                                    filterPanels={filterPanels}
                                    disabled={_isLoadingProducts}
                                />
                            </Grid> 
                            <Grid container item lg={9} xs={12} className={classes.productsSection}>
                                {_isLoadingProducts?
                                    <Loading height={keepHeight} /> :
                                    <React.Fragment>
                                        {Products.length? Products : 
                                            <Typography className={classes.noProducts} variant="h4">
                                                {globalVariables.LABEL_NO_PRODUCTS[globalVariables.LANG]}
                                            </Typography>
                                        }
                                    </React.Fragment>
                                }
                                <Pagination 
                                    current_page={query.page - 1}
                                    total={totalPages}
                                    limit={3}
                                    handleClick={this.paginationHandler}
                                    disabled={_isLoadingProducts}
                                />
                            </Grid>
                        </React.Fragment>
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
    return {
        handlePopupClose: () => dispatch(cartFinish()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Store)));