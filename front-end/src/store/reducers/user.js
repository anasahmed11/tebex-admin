import * as actionTypes from "../actionTypes";
import globalVariables from '../../global-variables';

const initialState = {
    user:{},
};



export default function auth(state = initialState, action){
    
    switch(action.type){
        case actionTypes.INIT_USER_OPERATION: 
            return{
                ...state,
                user: action.userData.user,
                program: action.userData.program
            }
        default: 
            console.log('_DEFAULT_USER');
        break;
    }
    
    return state;
}
