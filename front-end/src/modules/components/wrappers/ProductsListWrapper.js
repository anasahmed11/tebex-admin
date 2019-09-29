import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';
import Scroll from 'react-scroll';
import globalVariables, { noImage } from '../../../global-variables';
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


const Loading = (props) => <Grid container justify="center" alignItems="center"
                            style={props.height? {height: props.height} : null} >
                        <ClipLoader
                            css={`margin: auto`}
                            sizeUnit={"px"}
                            size={75}
                            color={'#594589'}
                            loading={true}
                        />
                    </Grid>

class Store extends Component {

    
    queryParseOptions = {
        arrayFormat: 'bracket',
        parseBooleans: true,
        parseNumbers: true,
    }

    sortValues = {
        en: ['Newest', 'Highest Price', 'Lowest Price', 'A - Z', 'Z - A'],
        ar: ['الأحدث', 'السعر الأعلى', 'السعر الأقل', 'أ - ي', 'ي - أ']
    };

    perPageValues = [15, 30, 60, 90];

    state = {
        _isLoading: true,
        _isLoadingProducts: true,
        products: [],
        slug: null,
        filterPanels: null,
        categoryID: 1,
        totalPages: 1,
        query: {},
        queryDefaults: {
            page: 0,
            sort: 0,
            perPage: this.perPageValues[0],
             // This will be set to min, max in componentDidMount
            minPrice: 0,
            maxPrice: 12999,    // Fake safe value
        },
        keepHeight: '40vh',
    }
    
    componentDidMount = () => {

        const { changingCategory } = this.props.location.state? this.props.location.state : false;

        // Parse url after "shop/"
        let slug = this.props.match.params.slug?
                     this.props.match.params.slug.indexOf('?') > -1?
                        this.props.match.params.slug.slice(0, this.props.match.params.slug.indexOf('?')).replace(/^\/|\/$/g, '').split('/')
                        : this.props.match.params.slug.replace(/^\/|\/$/g, '').split('/')
                     : null;
        if(Array.isArray(slug) && slug.length === 1 && slug[0] === '') slug = null;
        
        const { queryDefaults } = this.state;
        const query = queryString.parse(window.location.search, this.queryParseOptions);
        if(!(query.sort && query.sort > -1 && query.sort < this.sortValues.en.length && query.sort !== queryDefaults.sort))
            delete query.sort;
        if(!(query.perPage && query.perPage !== queryDefaults.perPage && this.perPageValues.findIndex(v => v === query.perPage) > -1))
            delete query.perPage;

        if(changingCategory){
            delete query.page;
            this.updateURLQuery(queryString.stringify(query, this.queryParseOptions));
        }    

        // console.log('ShopDidMount Query:', query);
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
                    this.fetchFilters();
            });
        })
        .catch(res => console.log('ERROR: Fetching categories failed.', res))
    }

    fetchProducts = () => {

        const { categoryID, query, queryDefaults, filterPanels } = this.state;
        
        let filtersObject = { specs: [], settings: [] }
        if(filterPanels){
            for(let filter of filterPanels){
                if(filter.type === 'menu') {
                    let spec = { id: filter.id, values: []}
                    for(let value of filter.values)
                        if(value[1]) spec.values.push(value[2]);
                    if(spec.values.length)
                        filtersObject.specs.push(spec);
                }
                else if(filter.type === 'text'){
                    filtersObject.settings.push({ id: 'pr', values: filter.values});
                }
            }
            filtersObject.settings.push({ id: 'pp', values: query.perPage? query.perPage : queryDefaults.perPage});
            filtersObject.settings.push({ id: 'sr', values: query.sort? query.sort : queryDefaults.sort});

            // Get products of current category for current page
            categoryAPI.post(`/${categoryID}/products?page=${query.page}`, filtersObject)
            .then(res => {
                const products = [];
                for (let item of res.data.data)
                    products.push(item);
                console.log('shit', res, query.page, filtersObject)
                // Set min and max price
                if(res.data.min_price)
                    queryDefaults.minPrice = res.data.min_price;
                if(res.data.max_price)
                    queryDefaults.maxPrice = res.data.max_price;
                
                this.setState({
                    products: products,
                    queryDefaults: queryDefaults,
                    totalProducts: res.data.total,
                    totalPages: Math.ceil(res.data.total/ res.data.per_page),
                    _isLoadingProducts: false,
                });
            })
            .catch(res => console.log(`shit ERROR: Fetching products [/${categoryID}/products]`, res, query.page, filtersObject));
        }
        else{
            categoryAPI.get(`/${categoryID}/products?page=${query.page}`)
            .then(res => {
                const products = [];
                for (let item of res.data.data)
                    products.push(item);
                
                // Set min and max price
                if(res.data.min_price)
                    queryDefaults.minPrice = res.data.min_price;
                if(res.data.max_price)
                    queryDefaults.maxPrice = res.data.max_price;
                
                this.setState({
                    products: products,
                    queryDefaults: queryDefaults,
                    totalProducts: res.data.total,
                    totalPages: Math.ceil(res.data.total/ res.data.per_page),
                    _isLoadingProducts: false,
                });
            })
        }
    }

    fetchFilters = () => {
        
        const { categoryID, categories, slug, queryDefaults } = this.state;

        // Initiate filterPanels with categories
        const filterPanels = [{
            id: '__category',
            name: {en: 'Category', ar: 'الفئة'},
            values: [],
            type: 'link',
        }];
         
        try {
            for(let cat of categories){
                if(cat.parent_id === categoryID){
                    categoryAPI.get(`/${cat.id}/products/count`).then(res => {
                        if(res.data.data.count > 0)
                            filterPanels[0].values.push({
                                slug: slug? slug.join('/') + '/' + cat.slug : cat.slug,
                                name: {ar: cat.name, en: cat.name_en},
                                total: res.data.data.count,
                            });
                    });
                }
            }
        } catch (err) { console.log('WARNING: Failed to fetch sub-categories.\n', err) }

        categoryAPI.get(`/${categoryID}/specs/count`)
            .then(res => {
                // Add specs to filterPanels
                try {
                    const specsObject = res.data.data;

                    for(let specKey of Object.getOwnPropertyNames(specsObject)){
                        let specKeyJson = JSON.parse(specKey);
                        //{id: 3, name_en: "Ram", name: "الرام", values: {…}}
                            // values:  //  ar: (3) ["1GB", "2GB", "3GB"]
                                        //  en: (3) ["1GB", "2GB", "3GB"]

                        const specValues = Object.getOwnPropertyNames(specsObject[specKey]);
                        // e.g. { {en: "2GB", ar: "2GB"} : 1 }
                        
                        const filter = {
                            id: specKeyJson.id,
                            name:  {en: specKeyJson.name_en, ar: specKeyJson.name},
                            values: [], // Can be done by map function
                            type: 'menu',
                        }
                        for(let valueKey of specValues){
                            let valueKeyJson = JSON.parse(valueKey);
                            let specIndex = specKeyJson.values.en.findIndex(v => v.toLowerCase() === valueKeyJson.en.toLowerCase());
                            filter.values.push([{en: valueKeyJson.en, ar: valueKeyJson.ar}, false, specIndex]);
                        }

                        filterPanels.push(filter);
                    }
                } catch (err) { console.log('WARNING: Filters processing failed.\n', err); }
                
                filterPanels.push({
                    id: '__price',
                    name: {en: 'Price', ar: 'السعر'},
                    values: [queryDefaults.minPrice, queryDefaults.maxPrice],
                    type: 'text',
                });

                this.setState({
                    filterPanels: filterPanels,
                }, () => this.updateFilters(true));
            })
            .catch(res => console.log('ERROR: Fetching specs failed.', res));
    }

    updateFilters = (init = false) => {
        
        try {
            const { filterPanels, query, queryDefaults } = this.state;
            for(let filter of filterPanels){
                if(filter.type !== 'menu')
                    continue;
                for(let i=0; i<filter.values.length; i++){
                    if(Array.isArray(query[filter.name.en]) && query[filter.name.en].findIndex(v => v === filter.values[i][0].en) > -1)
                        filter.values[i][1] = true;
                    else
                        filter.values[i][1] = false;
                }
            }
            let priceIndex = filterPanels.findIndex(v => v.type === 'text');
            if(priceIndex > -1){
                filterPanels[priceIndex].values[0] = query.minPrice? query.minPrice : queryDefaults.minPrice;
                filterPanels[priceIndex].values[1] = query.maxPrice? query.maxPrice : queryDefaults.maxPrice;
            }

            this.setState({
                filterPanels: filterPanels,
                _isLoading: false,
            }, () => {
                if(init) this.setState({ _isLoadingProducts: false })
                else this.fetchProducts();
            });

        } catch (err) { console.log('WARNING: Filters update failed.\n', err); }
    }
    
    filterCheckHandler = (specName, checkedValue) => {
        const query = this.state.query;
        if(!query[specName]){
            query[specName] = [];
            query[specName].push(checkedValue);
        }
        else{
            if(query[specName].findIndex(v => v === checkedValue) > -1)
                query[specName].splice(query[specName].findIndex(v => v === checkedValue), 1);
            else
                query[specName].push(checkedValue);
        }
        delete query.page;

        let keepHeight =  document.getElementById('filters-panel').children[0].offsetHeight;

        this.setState({
            keepHeight: keepHeight,
            query: query,
            _isLoadingProducts: true
        }, () => {
                this.updateURLQuery(queryString.stringify(query, this.queryParseOptions));
                this.updateFilters();
        });
    }

    paginationHandler = (page) => {
        
        const { query } = this.state;

        if(page.selected === 0) delete query.page;
        else query.page = page.selected + 1;

        // SCROLL ANIMATION
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
            this.updateFilters();
        });
    }

    selectHandler = (menu, value) => {
        const { query, queryDefaults } = this.state;
        if(menu === 'sort'){
            let sortIndex = this.sortValues[globalVariables.LANG].findIndex(v => v === value);
            if(sortIndex === queryDefaults.sort) delete query.sort;
            else query.sort = sortIndex;
        }
        if(menu === 'perPage'){
            if(value === queryDefaults.perPage) delete query.perPage;
            else query.perPage = value;
        }
        this.setState({
            query: query,
            _isLoadingProducts: true,
        }, () => {
            this.updateURLQuery(queryString.stringify(query, this.queryParseOptions));
            this.updateFilters();
        });
    }

    priceHandler = () => {
        const { query, queryDefaults } = this.state;
        let minValue = parseInt(document.getElementById('price-min-input').value);
        let maxValue = parseInt(document.getElementById('price-max-input').value);
        if(minValue === queryDefaults.minPrice && maxValue === queryDefaults.maxPrice){
            delete query.minPrice;
            delete query.maxPrice;
        }
        else{
            query.minPrice = minValue;
            query.maxPrice = maxValue;
        }
        delete query.page;

        let keepHeight =  document.getElementById('filters-panel').children[0].offsetHeight;
        this.setState({
            query: query,
            keepHeight: keepHeight,
            _isLoadingProducts: true,
        }, () => {
            this.updateURLQuery(queryString.stringify(query, this.queryParseOptions));
            this.updateFilters();
        });
    }

    render(){
        const { classes, isPopup, serverMessage, handlePopupClose, messageType } = this.props;
        const { 
            _isLoading,
            _isLoadingProducts,
            query,
            queryDefaults,
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
                        title={globalVariables.LANG === 'ar'? product.name : product.name_en} 
                        price={product.salePrice? product.salePrice : product.price}
                        oldPrice={product.salePrice? product.price : false}
                        currency={globalVariables.LABEL_CURRENCY[globalVariables.LANG]}
                        img={product.images.length? product.images[0] : noImage}
                        product={product}
                    /> 
            </Grid>
        )

        return _isLoading? <Loading />
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
                                        to={{
                                            pathname: qString? cat.link + '?' + qString : cat.link,
                                            state: { changingCategory: true }
                                        }}
                                    >
                                        {cat.name[globalVariables.LANG]}
                                    </Link>
                                </Typography>
                                )
                            :null}
                            <Typography className={classes.categoryLinkElement} variant="subtitle1">
                                {globalVariables.LANG === 'en'?
                                    `(Found ${this.state.totalProducts} products)` : `(متوفر ${this.state.totalProducts} منتج)`
                                }
                            </Typography>
                        </div>
                        <div className={classes.optionMenusSection}>
                            <SelectMenu 
                                name="sort"
                                sideLabel={globalVariables.LABEL_SHOP_SORT[globalVariables.LANG]}
                                values={this.sortValues[globalVariables.LANG]}
                                handleChange={this.selectHandler} 
                                selectedValue={this.sortValues[globalVariables.LANG][query.sort? query.sort : queryDefaults.sort]}
                                disabled={_isLoadingProducts}
                            />
                            <SelectMenu 
                                name="perPage"
                                sideLabel={globalVariables.LABEL_SHOP_PERPAGE[globalVariables.LANG]}
                                values={this.perPageValues}
                                handleChange={this.selectHandler} 
                                selectedValue={query.perPage? query.perPage : queryDefaults.perPage}
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
                                    defaultMin={query.minPrice? query.minPrice : queryDefaults.minPrice}
                                    defaultMax={query.maxPrice? query.maxPrice : queryDefaults.maxPrice}
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
                                    current_page={query.page? query.page - 1 : queryDefaults.page}
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