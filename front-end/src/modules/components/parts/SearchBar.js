import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { productsAPI, baseURL } from '../../../api/api';

import './searchBar.css';
import styles from '../../../assets/jss/components/parts/SearchBar';
import globalVariables, { noImage, getProductURL } from '../../../global-variables';

// const languages = [
//     {
//         title: 'Categories',
//         data: [
//             { id: 1, type: 0, image: "", name: 'Mobiles' },
//             { id: 1, type: 0, image: "", name: 'Accessories' }
//         ]
//     },
//     {
//         title: 'Products',
//         data: [
//             { id: 1, type: 1, price: 20, image: "", name: 'Mobile titan x red 1600GB xD' },
//             { id: 2, type: 1, price: 255, image: "", name: 'Mobile 155 and cute' },
//             { id: 3, type: 1, price: 215, image: "", name: 'Mobile but not a mobile' },
//             { id: 4, type: 1, price: 441, image: "", name: 'مكتبة جرير ليست مجرد مكتبة' },
//             { id: 5, type: 1, price: 4000, image: "", name: 'Control system design by prof Tal3at <3' },
//             { id: 6, type: 1, price: 200, image: "", name: 'Havana oh na na' },
//             { id: 7, type: 1, price: 90, image: "", name: 'ملوخية لكل ست بيت مصرية' },
//             { id: 8, type: 1, price: 86, image: "", name: 'ماوس طارق اللي مبيعرفش يلعب فورتنايت' },
//             { id: 9, type: 1, price: 86, image: "", name: 'بالي النائم' },
//         ]
//     },
//     {
//         title: 'See All Results',
//         data: []
//     },
// ];


// API CALL

const getSuggestions = value => {
    value = value.trim().toLowerCase();

    if (value === '') return [];

    productsAPI.post('search/', { q: value })
    .then(res=>{

        return res.data
            .map(product => {
                return {
                    title: "Products",
                    data: {
                        id: product.id,
                        type: 1,
                        name: product.name,
                        price: product.price,
                        salePrice: product.sale_price,
                        sku: product.sku,
                        slug: product.slug,
                        
                    }
                };
            })
    })
    .catch(error=>{
        return [];
    })
    

    

    // const regex = new RegExp('^' + value, 'i');
    // return languages
    //     .map(section => {
    //         return {
    //             title: section.title,
    //             data: section.data.filter(language => true || regex.test(language.name))
    //         };
    //     })
    //.filter(section => section.data.length > 0);
}

const getSuggestionValue = suggestion => suggestion.name;


const renderSuggestion = (suggestion) => {
    switch (suggestion.type) {
        case 0:
            return (
                <Grid container component={Link} style={{ height: '40px', textDecoration: 'none', color: 'black' }} to={`/category/${suggestion.id}`}>
                    <Grid item xs={1}

                        style={{
                            textAlign: 'center',
                            backgroundImage: "url('https://cdn2.iconfinder.com/data/icons/rounded-white-basic-ui-set-3/139/List-RoundedWhite-2-512.png')",
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat"
                        }}
                    >

                    </Grid>
                    <Grid item xs={10} style={{ marginLeft: '10px' }}>
                        <div style={styles.oneLineTextDisplay}>
                            {suggestion.name}
                        </div>

                    </Grid>
                </Grid>
            )

        default:
            return (
                <Grid component={Link} style={{ textDecoration: 'none', color: 'black' }} container to={`/product/${getProductURL(suggestion)}`}>
                    <Grid item xs={1}

                        style={{
                            textAlign: 'center',
                            backgroundImage: `url('${suggestion.image}')`,
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat"
                        }}
                    >

                    </Grid>
                    <Grid item xs={10} style={{ marginLeft: '10px' }}>
                        <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {//(suggestion.name.substring(0,30)) + ((suggestion.name.length>30)?'...':'')
                                suggestion.name}
                        </div>
                        <div>
                            {suggestion.price}$
                    </div>
                    </Grid>
                </Grid>
            );

    }

}


const renderSectionTitle = section => {
    if (section.seeAll)
        return (
            <Grid container justify="center">
                <Button component={Link} to={`/shop?q=${section.q}`} >
                    {section.title}
                </Button>
            </Grid>
        );
    return (
        <strong>{section.title}</strong>
    );
}

const getSectionSuggestions = section => section.data;

class CustomizedInputBase extends React.Component {
    state = {
        value: '',
        suggestions: [],
        lastRequestTime: 0,
    }

    onChange = (event, { newValue }) =>
        this.setState({ value: newValue });

    onSuggestionsFetchRequested = ({ value }) =>{
        value = value.trim().toLowerCase();

        if (value === '') {this.setState({ suggestions: [] }); return;}

        const time = Date.now();
        this.state.lastRequestTime = time;
            
        setTimeout(() => {
            if(this.state.lastRequestTime === time)
                productsAPI.post('search/', { q: value })
                .then(res=>{

                    const products = res.data.data
                        .map(product =>({
                                    id: product.id,
                                    type: 1,
                                    name: globalVariables.LANG==='ar'?product.name:product.name_en,
                                    price: product.price,
                                    salePrice: product.sale_price,
                                    image: product.images[0]? baseURL+product.images[0].slice(1):noImage,
                                    sku: product.sku,
                                    slug: product.slug,
                                })
                        );
                    const productSuggestions = {data: products, title: globalVariables.SEARCHBAR_SECTION_TITLE[globalVariables.LANG]};
                    
                    this.setState({ suggestions: [productSuggestions, {data: [],q:value , title: `${globalVariables.SEARCHBAR_SEE_ALL[globalVariables.LANG]} (${res.data.total})`, seeAll:true}] });
                })
                .catch(error=>{this.setState({ suggestions: [] });})
        }, 1000);
    }
        
    onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

    render() {
        const { classes } = this.props;
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: this.props.placeholder,
            value,
            onChange: this.onChange
        };
        const searchIconButton = this.props.searchIcon ?
            <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
            </IconButton> : null;

        return (
            <Paper className={classes.root} elevation={1}>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    multiSection
                    renderSectionTitle={renderSectionTitle}
                    getSectionSuggestions={getSectionSuggestions}
                />

                {searchIconButton}
            </Paper>
        );
    }
}

CustomizedInputBase.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CustomizedInputBase));