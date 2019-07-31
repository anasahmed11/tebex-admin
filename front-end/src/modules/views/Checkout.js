import React from 'react';
import { Typography, withStyles, Grid, Snackbar } from '@material-ui/core';

import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import 'typeface-roboto';
import { ClipLoader } from 'react-spinners';
import Cookies from 'universal-cookie';

import MySnackbar from '../components/parts/MySnackbar';
import Stepper from '../components/parts/Stepper';
import CheckoutAddress from '../components/wrappers/CheckoutAddress';
import Payment from '../components/wrappers/Payment';
import './styles/checkout.css'

import { locationAPI as axios, checkoutAPI } from '../../api/api';
import { clearCart, cartStart, cartSuccess, cartFail, cartFinish } from '../../store/actions/shoppingCart';

import CartEmpty from '../components/parts/CartEmpty'
import globalVariables from '../../global-variables';
import cancelablePromise from '../../Providers/CancelablePromise';


const cookies = new Cookies();

const styles = theme => ({
    root: {
        padding: `${theme.spacing.unit * 4}px 0px`,
        minHeight:'500px',   
        position:'relative',
        margin:'auto',
    },
    stepperContainer:{
        backgroundColor: '#dadada',
    },
    stepper: {
        backgroundColor: '#dadada',
        margin:'auto',
        paddingRight:'0px',
        paddingLeft:'0px',
        width: '80%',
    },
    sweetLoading:{
        textAlign:'center'
    }
    
});


function getSteps() {
    return [
        globalVariables.CHECKOUT_SHIPPING_ADDRESS[globalVariables.LANG],
        globalVariables.LABEL_PAYMENT[globalVariables.LANG],
        globalVariables.LABEL_THANKS[globalVariables.LANG]
    ];
}


function ThanXPage(props){
    
    return(
        
        <Grid container item justify="center" alignItems="center" spacing={16} xs={10} style={{textAlign:'center', position:'relative', overflow:"hidden"}}>
            <Grid item xs={11}>
                <Typography variant="h4" gutterBottom>{globalVariables.CHECKOUT_THANKS_STATUS[globalVariables.LANG]}</Typography>
                <Typography variant="h6">
                   {globalVariables.CHECKOUT_THANKS_REDIRECT[globalVariables.LANG]} <Link to={props.trackOrder}>{globalVariables.LABEL_HERE[globalVariables.LANG]}</Link>
                </Typography>
            
                <img className="slider-moving-animation" src="https://cnnh.org/wp-content/uploads/2017/02/moving2348563724.jpg" alt="order dlivery"/>
            </Grid>
            
        </Grid>
            
        )
}


class Checkout extends React.Component{
    state = {
        items: [],
        steps: getSteps(),
        stepIndex: 0,
        address: {},
        shipment: {},
        trackOrder: '/orders',
        isLoading: true
    }

    pendingPromises = [];
    componentWillUnmount = () => 
        this.pendingPromises.map(p => p.cancel());
    appendPendingPromise = promise =>
        this.pendingPromises = [...this.pendingPromises, promise];
    removePendingPromise = promise =>
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);




    getStepContent = () => {
        switch (this.state.stepIndex) {
            case 0:
              return <CheckoutAddress handleNextButton={this.handleNextButtonAddress} />;
            case 1:
              return <Payment 
                        address={this.state.address} 
                        totalPrice = {this.props.items.reduce((total,item)=>total+item.sale_price*item.cart.quantity,0)}
                        shipment= {this.state.shipment}
                        handleNextButton={this.handleNextButtonPayment} 
                        handleBackButton={this.stepBack} />;
            case 2:
              return <Route render={props=><ThanXPage {...props} trackOrder={this.state.trackOrder} />} /> 
            default:
              return 'Unknown step';
          }
    }

    componentDidMount(){
        this.setState({isLoading:false})
    }
    stepAdvance = () => {
        this.setState({stepIndex:this.state.stepIndex+1})
    }

    stepBack = () => {
        this.setState({stepIndex:this.state.stepIndex-1})
    }

    handleNextButtonAddress = (address) =>{
        if(address===undefined){
            alert('please create a new address or select one')
            return
        }

        const wrappedPromise = cancelablePromise(axios.get(`${address.id}/shipping`));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise
        .promise
        .then(res=>{    
            this.setState({address:address, shipment:res.data })
            this.stepAdvance()
        })
        .then(() => this.removePendingPromise(wrappedPromise))
        .catch(res=>{alert("عنوانك غير مدعوم في الشحن")})

        
    }
    handleNextButtonPayment = () =>{
        if(this.state.address === undefined) return //handle error
        
        this.setState({isLoading:true})
        
       
        this.props.handleCartStart()
        const products=[]
        this.props.items.forEach(item=>{
            let data={id:item.id,quantity:item.cart.quantity}
            products.push(data)
        })

        const data = {
                address: this.state.address.id,
                products: products,
                token: this.state.address._token,
                referral: cookies.get(globalVariables.AFFILIATE_COOKIE) !== undefined? cookies.get(globalVariables.AFFILIATE_COOKIE):0
        }
        
        const wrappedPromise = cancelablePromise(checkoutAPI.post('',data));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise
        .promise
        .then(res=>{
            this.props.handleClearCart()
            const trackOrder = "orders/"+res.data.url.split("/").pop()
            this.setState({trackOrder: trackOrder, isLoading: false})
            this.stepAdvance()
            this.props.handleCartSuccess("العملية تمت بنجاح")
        })
        .then(() => this.removePendingPromise(wrappedPromise))
        .catch(err=>{
            if (!err.isCanceled) {
                this.setState({isLoading: false})
            }
            this.props.handleCartFail("فشل في تنفيذ العملية")
        })
        
        
        
    }

    render(){
        const {classes, numItems, cartIsLoading, isPopup, serverMessage, messageType, handlePopupClose} = this.props;
        const {isLoading} = this.state
        return(
            <React.Fragment>
                <Snackbar
                    style={{direction:'ltr', bottom:'50px'}}   
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
                

                { cartIsLoading || isLoading || numItems || this.state.stepIndex===2?
                    <React.Fragment>
                        <Stepper steps={this.state.steps} stepIndex={this.state.stepIndex} color="#dfdfda" />
                        <Grid container item justify="center" className={classes.root} md={10} sm={10} xs={11} spacing={16}>
                            {isLoading && this.state.stepIndex === 1?
                                <Grid container alignItems="center" justify="center" >
                                    <ClipLoader
                                        sizeUnit={"px"}
                                        size={75}
                                        color={'#123abc'}
                                        loading={isLoading}
                                    />
                                </Grid>:null
                            }
                            {isLoading && this.state.stepIndex===1?null:this.getStepContent()}
                        </Grid>
                    </React.Fragment>
                    :
                    <Grid container item justify="center" className={classes.root} md={10} sm={10} xs={11} spacing={16}>
                        <CartEmpty />
                    </Grid>
                }
                
            </React.Fragment>
        );
    }



}
const mapStateToProps = state => {
    return {
        numItems: state.cart.numItems,
        items: state.cart.items,
        isPopup: state.cart.popup,
        cartIsLoading: state.cart.isLoading,
        serverMessage: state.cart.message,
        messageType: state.cart.messageType
    }
}

const mapDispatchToProps = dispatch => {
    return{
        handleClearCart: () => dispatch(clearCart()),
        handleCartStart: () => dispatch(cartStart()),
        handleCartSuccess: (message)=> dispatch(cartSuccess(message)),
        handleCartFail: (message) => dispatch(cartFail(message)),
        handlePopupClose: () => dispatch(cartFinish()),

    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Checkout)));