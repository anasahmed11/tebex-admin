
import * as actionTypes from '../actionTypes';



export const closePopup = () => {
    return {
        type: actionTypes.CLOSE_POPUP_MESSAGE,
     }
}

export function openPopup(message){
    return{
        type: actionTypes.OPEN_POPUP_MESSAGE,
        message: message 
    }
}