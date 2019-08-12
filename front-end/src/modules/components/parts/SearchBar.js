import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Autosuggest from 'react-autosuggest';
import './searchBar.css';
import { Grid, Button } from '@material-ui/core';

import { withRouter, Link } from 'react-router-dom';
import { productsAPI } from '../../../api/api';

const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    input: {
        flex: 1,
        margin: theme.spacing(1),
    },

    iconButton: {
    },
    oneLineTextDisplay: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
});


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

function getSuggestions(value) {
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

function getSuggestionValue(suggestion) { return suggestion.name; }


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
                <Grid component={Link} style={{ textDecoration: 'none', color: 'black' }} container to={`/product/${suggestion.id}`}>
                    <Grid item xs={1}

                        style={{
                            textAlign: 'center',
                            backgroundImage: "url('https://ss7.vzw.com/is/image/VerizonWireless/iphone7-front-matblk?$device-lg$')",
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


function renderSectionTitle(section) {
    if (section.title.slice(0,15) === 'See All Results')
        return (
            <Grid container justify="center" component={Button}>{section.title}</Grid>
        );
    return (
        <strong>{section.title}</strong>
    );
}


function getSectionSuggestions(section) { return section.data; }






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
            setTimeout(()=>{
                if(this.state.lastRequestTime===time)
                    productsAPI.post('search/', { q: value })
                    .then(res=>{

                        const products = res.data.data
                            .map(product =>({
                                        id: product.id,
                                        type: 1,
                                        name: product.name,
                                        price: product.price,
                                        salePrice: product.sale_price,
                                        image: "",
                                    })
                            );
                        const productSuggestions = {data: products, title: "products"};
                        
                        this.setState({ suggestions: [productSuggestions, {data: [], title: `See All Results(${res.data.total})`}] });
                    })
                    .catch(error=>{this.setState({ suggestions: [] });})
        },1000)
        
        
    }
        

    onSuggestionsClearRequested = () =>
        this.setState({ suggestions: [] });


    render() {
        const { classes } = this.props;
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: this.props.placeholder,
            value,
            onChange: this.onChange
        };
        const searchIconButton = this.props.searchIcon ?
            (<IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
            </IconButton>) : null;

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