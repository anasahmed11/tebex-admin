import React from 'react';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, Divider } from '@material-ui/core';
import 'typeface-roboto';

import ProductSpec from '../parts/SelectMenu';

import styles from '../../../assets/jss/components/wrappers/ProductSpecs';
import RichEditor from '../parts/RichText';

const ProductSpecs = props => {

    const { classes, specs, salePrice, price, productSpecs } = props;
    return (
        <Grid container className={classes.root}>
            
            <div>
                <div className={classes.priceDiv}>
                    {price?
                        <div className={classes.oldPriceDiv}>
                        <Typography className={classes.oldPrice} variant="subtitle1">
                            {price} {props.currency}
                        </Typography> 
                        <Typography className={classes.discount} variant="subtitle2">
                            {Math.round((price - salePrice) * 100 / price)}% {globalVariables.LABEL_PRODUCT_DISCOUNT[globalVariables.LANG]}
                        </Typography> 
                        </div>
                        : null
                    }
                    <Typography className={classes.price} variant="h5" gutterBottom>
                        {salePrice} {globalVariables.LABEL_CURRENCY[globalVariables.LANG]}
                    </Typography>
                </div>
            </div>

            <Grid item xs={12} className={classes.divider}>
                <Divider />
            </Grid>


            {/*Object.keys(specs).length?
                <React.Fragment>
                    <Grid item xs={12} className={classes.ndRoot}>
                        {Object.keys(specs).map((key) =>
                            <Grid container className={classes.spec}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" className={classes.specFont}>{key}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <ProductSpec 
                                        name={key}
                                        values={specs[key]}
                                        value={productSpecs[key]}
                                        handleChange={props.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                </React.Fragment>
                :null
            */}

            <Grid item xs={12} className={classes.ndRoot}>
                <Grid item xs={12}  style={{ fontSize: 20, marginBottom:'50px' }}>
                    <Typography variant="title" >المواصفات</Typography>
                </Grid>
                {productSpecs.map(productSpec =>
                    <Grid container className={classes.spec}>
                        <Grid item xs={12}>
                            <Typography component="h6" variant="h6" className={classes.specFont}>{productSpec.name}</Typography>
                        </Grid>
                        <Grid component='ul' item xs={12}>
                            {JSON.parse(productSpec.value)['ar']}
                        </Grid>
                    </Grid>
                )}
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="title" style={{ fontSize: 20 }} >{globalVariables.LABEL_DESCRIPTION[globalVariables.LANG]}</Typography>
            </Grid>
            <Grid item xs={12}>
                <RichEditor 
                    intial={props.description}
                    readOnly 
                /> 
            </Grid>

        </Grid>

    );
}

export default withStyles(styles)(ProductSpecs);