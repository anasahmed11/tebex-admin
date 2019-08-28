import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import globalVariables from '../../../global-variables';
import uuid from 'uuid';

import { withStyles, Grid, Typography, Divider } from '@material-ui/core';
import 'typeface-roboto';

import ProductSpec from '../parts/SelectMenu';

import styles from '../../../assets/jss/components/wrappers/ProductSpecs';
import RichEditor from '../parts/RichText';


class ProductSpecs extends Component {

    state = {
        specs: [],
    }

    componentDidMount = () => {
        const { specs } = this.state;
        specs.push({
            name: {en: 'RAM', ar: 'الذاكرة'}, 
            values: [
                {en: '64GB', ar: '64GB'},
                {en: '128GB', ar: '128GB'},
                {en: '256GB', ar: '256GB'},
            ],
            selected: 1
        });
        specs.push({
            name: {en: 'SHIT', ar: 'الخرا'}, 
            values: [
                {en: 'X', ar: 'س'},
                {en: 'Y', ar: 'ص'},
                {en: 'Z', ar: 'ع'},
            ],
            selected: 0
        });
    }

    handleSpecChange = (specName, value) => {
        const { specs } = this.state;
        let index = specs.findIndex(s => s.name.en === specName);
        specs[index].selected = specs[index].values.findIndex(v => v.en === value);
        this.setState({
            specs: specs
        })
        for(let spec of specs)
            console.log(spec.values[spec.selected][globalVariables.LANG])
    }

    render(){        
        const { classes, productSpecs } = this.props;
        const { name, name_en, sku, store, price, salePrice, description } = this.props.product;
        const lng = globalVariables.LANG

        return (
            <div>
                <Typography className={classes.title} variant="h6" align="left">
                    {lng === 'en'? name_en : name}
                </Typography>
                <div className={classes.section}>
                    <p>
                        <Typography variant="caption">{globalVariables.LABEL_PRODUCT_CODE[lng]}</Typography>
                        <Typography style={{textTransform: 'uppercase'}} variant="caption">{sku}</Typography>
                    </p>
                    <p>
                        <Typography variant="caption">{globalVariables.LABEL_SELLER[lng]}</Typography>
                        <Typography className={classes.seller} variant="caption">
                            {/*<Link to={`/store/${store.id}/${store.slug}`}>
                                {lng === 'en'? store.name_en : store.name}
                            </Link>*/}
                            {lng === 'en'? store.name_en : store.name}
                        </Typography>
                    </p>
                </div>

                {salePrice?
                    <div className={classes.section}>
                        <p>
                            <Typography variant="caption">{globalVariables.LABEL_PRODUCT_BEFORE_DISCOUNT[lng]}</Typography>
                            <Typography className={classes.oldPrice} variant="caption">
                            {lng === 'en'? `${globalVariables.LABEL_CURRENCY[lng]} ${price}` : `${price} ${globalVariables.LABEL_CURRENCY[lng]}`}
                            </Typography>
                        </p>
                        <p>
                            <Typography variant="caption">{globalVariables.LABEL_PRODUCT_PRICE2[lng]}</Typography>
                            <Typography className={classes.price} variant="caption">
                            {lng === 'en'? `${globalVariables.LABEL_CURRENCY[lng]} ${salePrice}` : `${salePrice} ${globalVariables.LABEL_CURRENCY[lng]}`}
                            </Typography>
                        </p>
                        <p>
                            <Typography variant="caption">{globalVariables.LABEL_PRODUCT_SAVING[lng]}</Typography>
                            <Typography className={classes.saving} variant="caption">
                            {lng === 'en'? `${globalVariables.LABEL_CURRENCY[lng]} ${price - salePrice}` : `${price - salePrice} ${globalVariables.LABEL_CURRENCY[lng]}`}
                            </Typography>
                        </p>
                    </div>
                :
                    <div className={classes.section}>
                        <p>
                            <Typography variant="caption">{globalVariables.LABEL_PRODUCT_PRICE2[lng]}</Typography>
                            <Typography className={classes.price} variant="caption">
                            {lng === 'en'? `${globalVariables.LABEL_CURRENCY[lng]} ${price}` : `${price} ${globalVariables.LABEL_CURRENCY[lng]}`}
                            </Typography>
                        </p>
                    </div>
                }

                <Divider className={classes.divider} />
                
                <Typography className={classes.specsTitle} variant="h6">
                    {globalVariables.LABEL_PRODUCT_SPECS[lng]}
                </Typography>
                <div className={classes.section} style={{borderCollapse: 'separate', borderSpacing: '6px',}}>
                    {productSpecs.map(spec => <p>
                        {lng === 'en'?
                        <Typography className={classes.specName} variant="caption" style={{verticalAlign: 'initial'}}>{spec.name_en}</Typography>
                        : <Typography className={classes.specName} variant="caption" style={{verticalAlign: 'initial'}}>{spec.name}</Typography>}
                        <Typography variant="caption" className={classes.specButtonActive}>{JSON.parse(spec.value)[lng]}</Typography>
                    </p>)}
                    {this.state.specs.map(spec => <p>
                        <Typography className={classes.specName} variant="caption" style={{verticalAlign: 'initial'}}>{spec.name[lng]}</Typography>
                        {spec.values.map((value, idx) =>
                            <Typography
                                variant="caption"
                                className={spec.selected === idx? classes.specButtonActive : classes.specButton}
                                onClick={spec.selected !== idx? () => this.handleSpecChange(spec.name.en, value.en) : null}>
                                    {value[lng]}
                            </Typography>
                        )}
                    </p>
                    )}
                </div>

                <Divider className={classes.divider} />
                
                <Typography className={classes.specsTitle} variant="h6">
                    {globalVariables.LABEL_DESCRIPTION[lng]}
                </Typography>

                <RichEditor intial={description} readOnly /> 
            </div>
        );
    }
}

export default withStyles(styles)(ProductSpecs);
