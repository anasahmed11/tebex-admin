import * as actionTypes from '../actionTypes';
import Cookies from 'universal-cookie';
import {cartAPI} from '../../api/api'
import globalVariables from '../../global-variables';

const cookies = new Cookies();



export const cartStart = () => {
    return{
        type:actionTypes.CART_START
    }
}

const addToCartOperation = (shopping_cart) => {
    const numItems = shopping_cart.reduce((total,item)=>total+item.cart.quantity,0)

    return{
        type:actionTypes.ADD_TO_CART_OPERATION,
        items: shopping_cart,
        numItems: numItems,
    }
}

export const cartSuccess = (message) => {
    return{
        type:actionTypes.CART_SUCCESS,
        message:message
    }
} 

export const cartFail = (message) => {
    return{
        type:actionTypes.CART_FAIL,
        message:message
    }
} 


export const addToCart = (product, quantity, messageShow=true, isModifiyOperation=false) =>{
    return dispatch => {
        dispatch(cartStart())
        
        if(cookies.get(globalVariables.ACCESS_TOKEN)){

            let data=
                {
                    "product": {
                        "id" : product.id,
                        "quantity" : product.quantity < quantity? product.quantity : quantity
                    }
                }
            cartAPI.post('add/',data)
            .then(res=>{
                const message = isModifiyOperation? "تم تعديل المنتج في السلة":"تم اضافة المنتج للسلة"
                dispatch(initCart(messageShow?message:""))
                
            })
            .catch(res=>{
                dispatch(cartFail(messageShow?"فشل في اضافة المنتج":""))
            })
        }
        else{
            if(!localStorage.getItem('shopping_cart')) localStorage.setItem('shopping_cart',JSON.stringify([]))

            let shopping_cart = JSON.parse(localStorage.getItem('shopping_cart'))
            
            const idx = shopping_cart.findIndex(item=>item.id===product.id)
            if(idx !== -1) shopping_cart[idx].cart.quantity = quantity
            else {
                product.cart = {}
                product.cart.quantity=quantity
                product.cart.user_id = 0
                product.cart.product_id = product.id
                shopping_cart.push(product)
            }

            localStorage.setItem('shopping_cart',JSON.stringify(shopping_cart))

            dispatch(addToCartOperation(shopping_cart))

            const message = isModifiyOperation? "تم تعديل المنتج في السلة":"تم اضافة المنتج للسلة"
            dispatch(cartSuccess(messageShow?message:""))


            
        }
    }
    
}


export const cartFinish = () => {
    return{
        type:actionTypes.CART_FINISH
    }
}


export const clearCart = () => {
    localStorage.setItem('shopping_cart',JSON.stringify([]))
    return{
        type:actionTypes.CLEAR_CART,
    }
}







export const deleteFromCart = (productID,shopping_cart) => {
    return dispatch => {
        dispatch(cartStart())
        //localStorage.setItem('shopping_cart',JSON.stringify([{id:1,quantity:2},{id:2,quantity:2},{id:3,quantity:2}])) //for testing only
        if(cookies.get(globalVariables.ACCESS_TOKEN)){
            let data = {
                "product":{"id":productID}	
            }
            cartAPI.post('/remove',data)
            .then(res=>{
                dispatch(cartSuccess("تم حذف المنتج من السلة"))
                const idx = shopping_cart.findIndex(item=>item.id===productID)
                shopping_cart.splice(idx,1)
                dispatch(addToCartOperation(shopping_cart))
            })
            .catch(res=>{
                dispatch(cartFail("فشل في حذف المنتج"))
            })

        }
         else{
 
            if(!localStorage.getItem('shopping_cart')) {
                dispatch(cartFail("Fail"))
                return 
            }
            
            let shopping_cart = JSON.parse(localStorage.getItem('shopping_cart'))
            const idx = shopping_cart.findIndex(item=>item.id===productID)

            shopping_cart.splice(idx,1)

            localStorage.setItem('shopping_cart',JSON.stringify(shopping_cart))

            dispatch(addToCartOperation(shopping_cart))
            dispatch(cartSuccess("تم حذف المنتج من السلة"))

           
        }

    }
}



const initCartOperation = (cartItems) => {
    const numItems = cartItems.reduce((total,item)=>total+item.cart.quantity,0)
    return{
        type:actionTypes.INIT_CATT_OPERATION,
        cartItems:cartItems,
        numItems:numItems
    }
}

export const initCart = (message="") => {
    
    return dispatch => {
        
        dispatch(cartStart())
        if(cookies.get(globalVariables.ACCESS_TOKEN)){
            cartAPI.get('')
            .then((res)=>{
                let modified=false
                let cartItems = res.data
                for(let i=0;i<cartItems.length;i++){
                    if(cartItems[i].quantity<cartItems[i].cart.quantity){
                        cartItems[i].cart.quantity = cartItems[i].quantity
                        
                        dispatch(addToCart({id:cartItems[i]},cartItems[i].quantity, false))
                        modified=true
                    }
                }
                dispatch(initCartOperation(cartItems))
                if(modified) alert("بعض المنتجات تم تعديلها في السلة, رجاء قم بتفقدها")
                dispatch(cartSuccess(message))

            })
            .catch((res) => {
                dispatch(cartFail("فشل في تحميل السلة"))
            })


        }else{
            if(!localStorage.getItem('shopping_cart')) localStorage.setItem('shopping_cart',JSON.stringify([]))
            let shoppingCart = JSON.parse(localStorage.getItem('shopping_cart'))
            dispatch(initCartOperation(shoppingCart))
            dispatch(cartSuccess(message))

        }
    }

}