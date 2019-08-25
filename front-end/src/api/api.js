import axios from 'axios';
import Cookies from 'universal-cookie';
import globalVariables from '../global-variables';
import { initCart } from '../store/actions/shoppingCart';
import { initUser } from '../store/actions/user';

const cookies = new Cookies();

export const baseURL = "http://127.0.0.1:8000/";
export const apiURL = baseURL+"api/";

export const webURL = "http://localhost:3000"

const instances = []

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}
export const authِAPI = axios.create({
    baseURL: `${apiURL}auth/`,
    headers: headers
});
instances.push(authِAPI)


export const verifyAPI = axios.create({
    baseURL: `${apiURL}auth/verify/email/`,
    headers: headers
});
instances.push(verifyAPI)


export const locationAPI = axios.create({
    baseURL: `${apiURL}address/`,
    headers: headers
})
instances.push(locationAPI)


export const storesAPI = axios.create({
    baseURL: `${apiURL}store/`,
    headers: headers
})
instances.push(storesAPI)


export const productsAPI = axios.create({
    baseURL: `${apiURL}product/`,
    headers: headers
})
instances.push(productsAPI)


export const honoredAPI = axios.create({
    baseURL: `${apiURL}honored/`,
    headers: headers
})
instances.push(honoredAPI)


export const categoryAPI = axios.create({
    baseURL: `${apiURL}category/`,
    headers: headers
})
instances.push(categoryAPI)


export const checkoutAPI = axios.create({
    baseURL: `${apiURL}checkout/`,
    headers: headers
})
instances.push(checkoutAPI)


export const cartAPI = axios.create({
    baseURL: `${apiURL}cart/`,
    headers: headers
})
instances.push(cartAPI)


export const orderAPI = axios.create({
    baseURL: `${apiURL}orders/`,
    headers: headers
})
instances.push(orderAPI)


export const resendAPI = axios.create({
    baseURL: `${apiURL}auth/verify/resend/email/`,
    headers: headers
});
instances.push(resendAPI)

export const userAPI = axios.create({
    baseURL: `${apiURL}user/`,
    headers: headers
});
instances.push(userAPI)

instances.forEach( intance =>{
    intance.interceptors.request.use(function(config) {
        config.headers.Authorization = cookies.get(globalVariables.ACCESS_TOKEN)? `Bearer ${cookies.get(globalVariables.ACCESS_TOKEN)}` : '';
        
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
    intance.interceptors.response.use(function(response) {
        //console.log("response",response)
        
        return response
        
    }, function(err) {
        // if(err.response)
        //     console.log("response error",err.response.status)

        if(err.response && err.response.status===401){
            cookies.remove(globalVariables.ACCESS_TOKEN)
            initCart()
            initUser()
        }
        return Promise.reject(err);
    });
})

