import Cookies from 'universal-cookie';

import globalVariables from '../../global-variables';
import * as actionTypes from '../actionTypes';
import { authِAPI as axios } from '../../api/api';

const cookies = new Cookies();


const authStart = () => {
    return {    
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (access_token) => {
    return {    
        type: actionTypes.AUTH_SUCCESS,
        token: access_token,
    };
};

const authFailed = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const loginUser = (email, password, rememberme) => {
    return dispatch => {
        dispatch(authStart());
      
        const data = {
            email: email,
            password: password,
            remember_me: rememberme
        };
                
        axios.post('login', data)
        .then(res => {
            const expirationDate = new Date(res.data.expires_at);
            cookies.set(globalVariables.ACCESS_TOKEN, res.data.access_token, { path: '/', expires: expirationDate, sameSite : true });
            dispatch(authSuccess(res.data.access_token));
        })
        .catch(err => {
            dispatch(authFailed(globalVariables.MSG_LOGIN_FAIL[globalVariables.LANG])); // Authentication failed
            // Implement: handle network error.
        })
       
    }
}

const registerSuccess = (access_token) => {
    return {    
        type: actionTypes.REG_SUCCESS,
        token: access_token,
    };
};

const registerFailed = (error,registerErrors=[]) =>{
    return {
        type: actionTypes.REG_FAIL,
        error: error,
        registerErrors: registerErrors
    };
};

export const registerUser = (data) => {
    return dispatch => {
        console.log(data)
        dispatch(authStart());

        axios.post('register', data)
        .then(res => {
            const expirationDate = new Date(res.data.expires_at);
            cookies.set(globalVariables.ACCESS_TOKEN, res.data.access_token, { path: '/', expires: expirationDate, sameSite : true });
            dispatch(registerSuccess(res.data.access_token));
        })
        .catch(error => {
            if (error.response) dispatch(registerFailed(error.response.data.message, error.response.data.errors));
            else if (error.request) dispatch(registerFailed(globalVariables.MSG_NETWORK_ERROR[globalVariables.LANG]));
            else console.log('Error', error.message);
           
        })
    }
}


const logoutSuccess = () => {
    return{
        type:actionTypes.LOGOUT_SUCCESS
    }
}

const logoutFail = () => {
    return{
        type:actionTypes.LOGOUT_FAIL
    }
}

export const logoutUser = () => {
    return dispatch => {

        axios.get('logout')
        .then(res => {
            dispatch(logoutSuccess(res.data.access_token));
            cookies.remove(globalVariables.ACCESS_TOKEN)
        })
        .catch(err => {
            dispatch(logoutFail("Error."));
            // Implement: handle network error.
        })
    }
}

export const closePopup = () => {
    return {
         type: actionTypes.CLOSE_POPUP
     }
}