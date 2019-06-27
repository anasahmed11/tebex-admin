import * as actionTypes from "../actionTypes"
import * as globalVariables from '../../global-variables';

const initialState = {
    numItems: 0,
    items: [],    
    isLoading: false,
    message: "",
    messageType: "",
    popup: false,
};



export default function auth(state = initialState, action){
    
    switch(action.type){
        case actionTypes.CART_START: 
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ADD_TO_CART_OPERATION: 
            return{
                ...state,
                items: action.items,
                numItems: action.numItems
            }
        case actionTypes.CART_SUCCESS: 
            return{
                ...state,
                isLoading: false,
                popup: true,
                message: action.message,
                messageType: globalVariables.TYPE_SUCCESS,
            };
        case actionTypes.CART_FAIL: 
            return{
                ...state,
                isLoading: false,
                popup: true,
                message: action.message,
                messageType: globalVariables.TYPE_ERROR,
            }
        case actionTypes.CART_FINISH: 
            return{
                ...state,
                isLoading: false,
                popup: false,
                message: ""
            }
        case actionTypes.CLEAR_CART: 
            return{
                ...state,
                numItems: 0,
                items: [],
            }
        case actionTypes.INIT_CATT_OPERATION: 
            return{
                ...state,
                numItems: action.numItems,
                items: action.cartItems,
            }
        default: 
            console.log('_DEFAULT_CART');
        break;
    }
    
    return state;
}
