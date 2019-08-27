import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import globalVariables from '../../../global-variables';
import { withStyles, Grid, Typography, Divider, TextField, Button } from '@material-ui/core';
import 'typeface-roboto';

import { locationAPI,  } from '../../../api/api';

import styles from '../../../assets/jss/components/parts/AddToCart';

class AddToCart extends React.Component{
    state = {
        city: 0,
        cities: [],
        quantity: 1,
        shipping: {},
        isLoading: true,
    }
    
    componentDidMount(){
        locationAPI.get('cities/1')
        .then(res=>{
            const cities = res.data.map(item => ({id: item.id, name: item.city_name}));
            this.setState({
                cities: cities,
                city: cities[0].id,
            })
            this.getShippingPrice(1)
        })
        .catch(res=>{
            this.setState({isLoading:false})
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
        // console.log(event.target.value)
        this.setState({ 
            city: event.target.value, 
            isLoading:true 
        });
        this.getShippingPrice(event.target.value)
    };

    render(){
        const { classes, quantity, store } = this.props;
        const { isLoading } = this.state;
        const QUANTITIES = [...Array(quantity)].map((itme,idx)=>idx+1)
        return(
            <React.Fragment>
            {isLoading?
            <Grid container justify="center" alignItems="center" style={{height:'250px'}} className={classes.orderContainer}>
                <Grid container justify="center" >
                        <ClipLoader
                            sizeUnit={"px"}
                            size={75}
                            color={'#123abc'}
                            loading={isLoading}
                        />
                </Grid>
            </Grid>
            :
            <div className={classes.orderContainer} style={{borderCollapse: 'separate', borderSpacing: '4px'}}>

                <Typography className={classes.orderHeader} variant="h6">
                    اطلب المنتج
                </Typography>
                
                <Divider className={classes.divider} variant="middle" />
                
            {quantity?<React.Fragment>
                <div className={classes.section}>
                    <p>
                    <Typography variant="caption" > {globalVariables.LABEL_QUANTITY[globalVariables.LANG]}: </Typography>
                    <span item >                    
                        <form>
                            <TextField
                                select
                                variant='outlined'
                                disabled={QUANTITIES.length === 1 || QUANTITIES.length === 0}
                                value={this.state.quantity}
                                onChange={(event) => this.setState({quantity:event.target.value})}
                                SelectProps={{
                                    native: true,
                                    
                                }}
                                InputProps={{
                                    classes: {
                                        input: classes.orderSelectMenu,
                                    },
                                }}
                                >
                                {QUANTITIES.map(n => <option value={n}> {n} </option>)}
                            </TextField>
                        </form> 
                    </span>
                    </p>

                    <p>
                    <Typography variant="caption" >{globalVariables.LABEL_SHIPPING_TO[globalVariables.LANG]}</Typography>
                    <span>
                        <form>
                            <TextField
                                select
                                variant="outlined"
                                value={this.state.city}
                                onChange={(event) => this.handleCityChange(event)}
                                SelectProps={{
                                    native: true,
                                }}
                                InputProps={{
                                    classes: {
                                        input: classes.orderSelectMenu,
                                    },
                                }}>
                                {this.state.cities.map(city => 
                                    <option value={city.id}> {city.name} </option>
                                )}
                            </TextField>
                        </form>
                    </span>
                    </p>
                
                </div>
                
                <div className={classes.section}>
                {this.state.shipping.message !== undefined?
                    <Typography variant="caption" >{this.state.shipping.message}</Typography>
                :
                <React.Fragment>
                <p>
                    <Typography variant="caption" > {globalVariables.LABEL_PRICE[globalVariables.LANG]}:  </Typography>
                    <Typography variant="caption" > {this.state.shipping.fees} {globalVariables.LABEL_CURRENCY[globalVariables.LANG]} </Typography>
                </p>
                <p>
                    <Typography variant="caption" style={{color: 'blue'}} > يصل في: </Typography>
                    <Typography variant="caption" style={{color: 'blue'}} > {this.state.shipping.min_days} - {this.state.shipping.max_days} ايام </Typography>
                </p>
                </React.Fragment>
                }
                </div>
                
                <Grid item xs={12} >
                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary"
                        className={classes.addButton}
                        disabled={QUANTITIES.length===0}
                        onClick={()=>this.props.addToCart(this.state.quantity)}
                    > 
                        {globalVariables.CART_ADD[globalVariables.LANG]}      
                    </Button>               
                </Grid>
            </React.Fragment>
            :<Typography className={classes.outOfStock} align="center">
                <FontAwesomeIcon  icon={['fas', 'exclamation-triangle']} />
                {globalVariables.PRODUCT_OUT_OF_STOCK[globalVariables.LANG]}
            </Typography>
            }
            </div>
            }
            </React.Fragment>
        );
    }
}
export default withRouter(withStyles(styles)(AddToCart));


