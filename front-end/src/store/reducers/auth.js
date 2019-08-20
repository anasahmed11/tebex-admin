import * as actionTypes from "../actionTypes";
import globalVariables from '../../global-variables';

const initialState = {
    token: null,
    isLoading: false,
    message: "",
    popup: false,
    registerErrors:[],
    messageType: globalVariables.TYPE_INFO,
    isAuthinticated: false,
    redirectPath:'/home'
};

export default function auth(state = initialState, action){
    
    switch(action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                isLoading: false,
                token: action.token,
                messageType: globalVariables.TYPE_SUCCESS,
                message: globalVariables.MSG_LOGIN_SUCCESS[globalVariables.LANG],
                popup: false,
                isAuthinticated:true
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                isLoading: false,
                messageType: globalVariables.TYPE_ERROR,
                message: action.error,
                popup: true
            };
        case actionTypes.CLOSE_POPUP:
            return {
                ...state,
                popup: false,
                message: "",
                messageType: globalVariables.TYPE_INFO,
            };
        case actionTypes.REG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.token,
                messageType: globalVariables.TYPE_SUCCESS,
                message: globalVariables.MSG_REGISTER_SUCCESS[globalVariables.LANG],
                popup: true,
                isAuthinticated:true
            };
        case actionTypes.REG_FAIL:
            return {
                ...state,
                isLoading: false,
                messageType: globalVariables.TYPE_ERROR,
                message: action.error,
                registerErrors: action.registerErrors,
                popup: true
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                message: globalVariables.MSG_LOGOUT_SUCCESS[globalVariables.LANG],
                messageType: globalVariables.TYPE_SUCCESS,
                popup: true
            }
        case actionTypes.LOGOUT_FAIL:
            return {
                ...state,
                message: globalVariables.MSG_LOGOUT_FAIL[globalVariables.LANG],
                messageType: globalVariables.TYPE_ERROR,
                popup: true
            }
        default:
            console.log('_DEFAULT_AUTH');
        break;
    }
    
    return state;
}