import * as actionTypes from '../actionTypes';
import Cookies from 'universal-cookie';
import {userAPI} from '../../api/api'
import globalVariables from '../../global-variables';

const cookies = new Cookies();


const initUserOperation = (userData) => {
    return{
        type: actionTypes.INIT_USER_OPERATION,
        userData: userData,
    }
}



export const initUser = () => {
    
    return dispatch => {
        userAPI.get('')
        .then(res=>{
            dispatch(initUserOperation(res.data))
            const color = res.data.user.gender==='M'?'lightslategrey':'lightcoral';
            cookies.set(globalVariables.AVATAR_COLOR_COOKIE,color)
        })
        .catch(err=>{
            dispatch(initUserOperation({}))
        })
    }

}