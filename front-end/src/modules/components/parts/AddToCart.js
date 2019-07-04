import {withStyles, Grid, Typography, Divider, TextField, Button } from '@material-ui/core';
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import 'typeface-roboto';

import { ClipLoader } from 'react-spinners';

import { locationAPI,  } from '../../../api/api';

import globalVariables from '../../../global-variables';

const styles= theme => ({
    root:{
        textAlign:'initial'
    },
    root2:{
        textAlign:'initial',
        border: '1px solid lightgray',
        padding:'0px 4px'
    },
    ship:{
        fontSize: '12px',
        color: 'gray',
    },
    menu: {
        margin: '0px 4px 10px 0px'
    },
    font:{
        fontSize: '12px',
        height:'100%',
    },
    padding:{
        padding:'4px 0px'
    },
    cleanLink: {
        textDecoration: 'none',
        color: 'navy',
    }
   
})

class AddToCart extends React.Component{
    state = {
        city:"القاهرة",
        CITIES:[],
        quantity:1,

        shipping:{},
        isLoading:true,

    }
    componentDidMount(){
        locationAPI.get('cities/1')
        .then(res=>{
            const CITIES = res.data.map(item=>{return {id:item.id, name:item.city_name} })
            this.setState({
                CITIES: CITIES,
            })
            this.getShippingPrice(1)
        })
        .catch(res=>{

        })

        
    }

    getShippingPrice = (id) =>{
        locationAPI.get(`${id}/shipping/city`)
        .then(res=>{
            this.setState({
                shipping: res.data,
                isLoading: false,
            })
        })
        .catch(res=>{
            this.setState({
                shipping: {
                    message: globalVariables.PRODUCT_SHIPPING_STATUS[globalVariables.LANG]
                },
                isLoading: false,
            })
        })
    }

    handleCityChange = event => {
        console.log(event.target.value)
        this.setState({ city: event.target.value, isLoading:true });
        this.getShippingPrice(event.target.value)
    };

    render(){
        const { classes, quantity, store } = this.props;
        const { isLoading } = this.state;
        const QUANTITIES = [...Array(quantity)].map((itme,idx)=>idx+1)
        return(
            <React.Fragment>
            {isLoading?
                <Grid container justify="center" alignItems="center" style={{height:'250px'}} className={classes.root2}>
                
                        <Grid container justify="center" >
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={75}
                                    color={'#123abc'}
                                    loading={isLoading}
                                />
                        </Grid>
                </Grid>:
            <Grid container className={classes.root2} >
            
                
                <Grid container alignItems="center" xs={12} className={classes.padding}>
                    <Grid item>
                        <Typography variant="h6" inline className={classes.ship} >{globalVariables.LABEL_SHIPPING_TO[globalVariables.LANG]}</Typography>
                    </Grid>
                    <Grid item>
                        <b>
                            <form style={{display:'inline'}}>
                                <TextField
                                    select
                                    className={classes.menu}
                                    value={this.state.city}
                                    onChange={(event) => this.handleCityChange(event)}
                                    SelectProps={{
                                        native: true,
                                        
                                    }}
                                    InputProps={{
                                        classes: {
                                        input: classes.font,
                                        },
                                    }}
                                    >
                                    {this.state.CITIES.map(n => <option value={n.id}> {n.name} </option>)}
                                </TextField>
                            </form>

                        </b>
                    </Grid>
                
                </Grid>
                {this.state.shipping.message !== undefined?
                 <Grid container xs={12} justify='center' alignItems='center' className={classes.padding} style={{textAlign:'center',minHeight:'50px'}}>
                    <Grid item xs={12}>
                        <Typography variant="h6" inline className={classes.ship} >{this.state.shipping.message}</Typography>
                    </Grid>
                    
                </Grid>:
                <React.Fragment>
                <Grid container xs={12} className={classes.padding}>
                    <Grid item xs={6}>
                        <Typography variant="h6" inline className={classes.ship} > {globalVariables.LABEL_PRICE[globalVariables.LANG]}: {this.state.shipping.fees} {globalVariables.LABEL_CURRENCY[globalVariables.LANG]} </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" inline className={classes.ship} > يصل في: {this.state.shipping.min_days} - {this.state.shipping.max_days} ايام </Typography>
                    </Grid>
                </Grid>
                </React.Fragment>
                }

                <Grid item xs={12} className={classes.padding}><Divider variant='middle' /></Grid>
                <Grid container xs={12} className={classes.padding}>
                    <Grid item xs={6}>
                        <Typography variant="h6" inline className={classes.ship} >
                            {globalVariables.LABEL_SELLER[globalVariables.LANG]}
                            <Link to={`/store/${store.id}`} className={classes.cleanLink}>
                                {' ' + store.name}
                            </Link> 
                         </Typography>
                    </Grid>
                    
                </Grid>

                <Grid container xs={12} alignItems="center" className={classes.padding}>
                    <Grid item >
                        <Typography variant="h6" inline className={classes.ship} > {globalVariables.LABEL_QUANTITY[globalVariables.LANG]} </Typography>
                    </Grid>
                    <Grid item >                    
                        <form style={{display:'inline'}}>
                            <TextField
                                select
                                disabled={QUANTITIES.length===1 || QUANTITIES.length===0}
                                className={classes.menu}
                                value={this.state.quantity}
                                onChange={(event) => this.setState({quantity:event.target.value})}
                                SelectProps={{
                                    native: true,
                                    
                                }}
                                InputProps={{
                                    classes: {
                                    input: classes.font,
                                    },
                                }}
                                >
                                {QUANTITIES.map(n => <option value={n}> {n} </option>)}
                            </TextField>
                        </form> 
                    </Grid>
                </Grid>
                
                <Grid item xs={12} className={classes.padding}><Divider variant='middle' /></Grid>
                
                <Grid item xs={12} className={classes.padding}>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        disabled={QUANTITIES.length===0}
                        onClick={()=>this.props.addToCart(this.state.quantity)}
                    > 
                        {globalVariables.CART_ADD[globalVariables.LANG]}      
                    </Button>               
                </Grid>
                

            </Grid>
                    }

            </React.Fragment>
        );
    }
}
export default withRouter(withStyles(styles)(AddToCart));


