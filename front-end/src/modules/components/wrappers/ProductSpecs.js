import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import globalVariables from '../../../global-variables';

import { withStyles, Typography, Divider } from '@material-ui/core';
import 'typeface-roboto';

import styles from '../../../assets/jss/components/wrappers/ProductSpecs';
import RichEditor from '../parts/RichText';


class ProductSpecs extends Component {

    state = {
        specs: [],
        isLoading: true,
    }

    
    componentDidMount = () => {
        
        const { variations, product } = this.props;
        const buttons = {};
        
        const selectedSpecs = {};
        for(let spec of product.specs)
            selectedSpecs[spec.name_en] = JSON.parse(spec.value).en;
        
        // console.log('sku selected', selectedSpecs);
        // console.log('sku', variations);

        if(variations){
            
            const { products, allspecs } = variations;
            for(let specObj of allspecs){
                let spec = specObj.name;
                buttons[spec] = [];
                for(let value of specObj.values){
                    if(selectedSpecs[spec] === value)
                        buttons[spec].push({value: value, selected: true, link: ''});
                    else{
                        let choice = null;
                        let selectedSet = Object.assign({}, selectedSpecs); delete selectedSet[spec];
                        for(let variation of products){
                            let firstIndex = variation.specs.findIndex(s => s.value === value);
                            if(firstIndex < 0) continue;
                            else{
                                if(!choice) choice = variation;
                                let f = true;
                                for(let s of Object.getOwnPropertyNames(selectedSet)){
                                    if(variation.specs.findIndex(sp => sp.name !== spec && sp.value === selectedSet[s]) < 0){
                                        f = false;
                                        break;
                                    }
                                }
                                if(f) {
                                    choice = variation;
                                    break;
                                }
                            }
                        }
                        if(choice) buttons[spec].push({value: value, selected: false, link: choice.link});
                    }
                }
            }
        }
        else{
            for(let spec of Object.getOwnPropertyNames(selectedSpecs))
                buttons[spec] = [{value: selectedSpecs[spec], selected: true, link: ''}];
        }

        this.setState({
            specs: buttons,
            isLoading: false,
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
        const { isLoading, specs } = this.state;
        const { classes } = this.props;
        const { name, name_en, sku, store, price, sale_price, description } = this.props.product;
        const lng = globalVariables.LANG

        return isLoading? null :
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

                {sale_price?
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
                            {lng === 'en'? `${globalVariables.LABEL_CURRENCY[lng]} ${sale_price}` : `${sale_price} ${globalVariables.LABEL_CURRENCY[lng]}`}
                            </Typography>
                        </p>
                        <p>
                            <Typography variant="caption">{globalVariables.LABEL_PRODUCT_SAVING[lng]}</Typography>
                            <Typography className={classes.saving} variant="caption">
                            {lng === 'en'? `${globalVariables.LABEL_CURRENCY[lng]} ${price - sale_price}` : `${price - sale_price} ${globalVariables.LABEL_CURRENCY[lng]}`}
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
                    {Object.getOwnPropertyNames(specs).map(key => <p>
                        <Typography className={classes.specName} variant="caption" style={{verticalAlign: 'initial'}}>{key}</Typography>
                        {specs[key].map(spec => spec.selected? 
                            <Typography variant="caption" className={classes.specButtonActive}>
                                    {spec.value}
                            </Typography>
                            :
                            <Link to={spec.link}>
                                <Typography variant="caption" className={classes.specButton}>
                                        {spec.value}
                                </Typography>
                            </Link>
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
    }
}

export default withStyles(styles)(ProductSpecs);
