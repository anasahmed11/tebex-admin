import * as actionTypes from "../actionTypes";
import globalVariables from '../../global-variables';

const initialState = {
    message: "",
    isPopup: false,
    messageType: globalVariables.TYPE_INFO,
};



export default function auth(state = initialState, action){
    
    switch(action.type){
        case actionTypes.OPEN_POPUP_MESSAGE:
            return {
                ...state,
                message: action.message,
                isPopup: true
            }
        case actionTypes.CLOSE_POPUP_MESSAGE:
            return {
                ...state,
                message: "",
                isPopup: false
            }
        default:
            console.log('_DEFAULT_SITE');
        break;
    }
    
    return state;
}