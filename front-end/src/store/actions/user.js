import axios from 'axios';
import * as actionTypes from '../actionTypes';
import Cookies from 'universal-cookie';
import {userAPI} from '../../api/api'
import globalVariables from '../../global-variables';

const cookies = new Cookies();


const initUserOperation = (userData) => {
    return{
        type:actionTypes.INIT_USER_OPERATION,
        user:userData,
    }
}



export const initUser = () => {
    
    return dispatch => {
        userAPI.get('')
        .then(res=>{
            dispatch(initUserOperation(res.data))
        })
        .catch(err=>{
            dispatch(initUserOperation({}))
        })
    }

}