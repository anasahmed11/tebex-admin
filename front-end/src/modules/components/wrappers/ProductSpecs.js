import React from 'react';
import 'typeface-roboto';
import {withStyles, Grid, Typography,Divider} from '@material-ui/core';
import ProductSpec from '../parts/SelectMenu';

const styles = theme => ({
    root: {
      textAlign: 'initial',
    },
    ndRoot:{
       
        width:'100%',
        minHeight:'300px',
    },
    salePrice:{
        color: 'darkblue',
        fontSize: '25px',
        fontWeight: 'bold',
    },
    price:{
        textDecoration:'line-through',
        fontSize: '12px',
        color: 'gray',
    },
    priceSave:{
        fontSize: '12px',
    },
    specFont:{
        fontSize:'15px'
    },
    spec:{
        margin:"10px 0px"
    },
    divider: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    }
});

function ProductSpecs(props){
    const {classes, specs, salePrice, price, productSpecs} = props;

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Typography component="h5" variant="h5" className={classes.salePrice}>{salePrice} جنيه</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography component="h5" variant="h5" inline gutterBottom className={classes.price}>{price} جنيه</Typography>
                <Typography component="h5" variant="h5" inline gutterBottom className={classes.priceSave}> - انت ستوفر {price-salePrice} جنيه</Typography>
            </Grid>
            <Grid item xs={12} className={classes.divider}>
                <Divider/>
            </Grid>
            {Object.keys(specs).length?
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
                </React.Fragment>:null
            }
            <Grid item xs={12}>
                <Typography gutterBottom variant="title" style={{fontSize: 15}} >الوصف</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography gutterBottom variant="title" style={{fontSize: 17}} >{props.description}</Typography>
            </Grid>
        </Grid>

    );
}

export default withStyles(styles)(ProductSpecs);