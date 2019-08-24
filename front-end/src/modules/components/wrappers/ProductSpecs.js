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
            <Grid item xs={12}>
                <Typography component="h5" variant="h5" className={classes.salePrice}>{salePrice} {globalVariables.LABEL_CURRENCY[globalVariables.LANG]}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography component="h5" variant="h5" inline gutterBottom className={classes.price}>{price} {globalVariables.LABEL_CURRENCY[globalVariables.LANG]}</Typography>
                <Typography component="h5" variant="h5" inline gutterBottom className={classes.priceSave}> - انت ستوفر {price - salePrice} {globalVariables.LABEL_CURRENCY[globalVariables.LANG]}</Typography>
            </Grid>
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
                {productSpecs.map(productSpec =>
                    <Grid container className={classes.spec}>
                        <Grid item xs={12}>
                            <Typography component="h6" variant="h6" className={classes.specFont}>{productSpec.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {JSON.parse(productSpec.value)['ar']}
                        </Grid>
                    </Grid>
                )}
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography gutterBottom variant="title" style={{ fontSize: 15 }} >{globalVariables.LABEL_DESCRIPTION[globalVariables.LANG]}</Typography>
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