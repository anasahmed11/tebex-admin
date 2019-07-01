import axios from 'axios';
import Cookies from 'universal-cookie';
import globalVariables from '../global-variables';

const cookies = new Cookies();

const baseURL = "http://127.0.0.1:8000/api/"

export const webURL = "http://localhost:3000"

const instances = []


export const authِAPI = axios.create({
    baseURL: `${baseURL}auth/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
instances.push(authِAPI)


export const verifyAPI = axios.create({
    baseURL: `${baseURL}auth/verify/email/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
instances.push(verifyAPI)


export const locationAPI = axios.create({
    baseURL: `${baseURL}address/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})
instances.push(locationAPI)


export const storesAPI = axios.create({
    baseURL: `${baseURL}store/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})
instances.push(storesAPI)


export const productsAPI = axios.create({
    baseURL: `${baseURL}product/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})
instances.push(productsAPI)


export const honoredAPI = axios.create({
    baseURL: `${baseURL}honored/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
instances.push(honoredAPI)


export const categoryAPI = axios.create({
    baseURL: `${baseURL}category/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})
instances.push(categoryAPI)


export const checkoutAPI = axios.create({
    baseURL: `${baseURL}checkout/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})
instances.push(checkoutAPI)



export const cartAPI = axios.create({
    baseURL: `${baseURL}cart/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})
instances.push(cartAPI)






export const orderAPI = axios.create({
    baseURL: `${baseURL}orders/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

    }
})
instances.push(orderAPI)


instances.forEach( intance =>{
    intance.interceptors.request.use(function(config) {
        config.headers.Authorization = cookies.get(globalVariables.ACCESS_TOKEN)? `Bearer ${cookies.get(globalVariables.ACCESS_TOKEN)}` : '';
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
})

