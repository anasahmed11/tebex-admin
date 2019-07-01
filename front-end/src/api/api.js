import axios from 'axios';
import Cookies from 'universal-cookie';
import globalVariables from '../global-variables';

const cookies = new Cookies();
const access_token = cookies.get(globalVariables.ACCESS_TOKEN);

const baseURL = "http://127.0.0.1:8000/api/"

export const webURL = "http://localhost:3000"

export const authِAPI = axios.create({
    baseURL: `${baseURL}auth/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': access_token? `Bearer ${access_token}` : ''
    }
});

export const verifyAPI = axios.create({
    baseURL: `${baseURL}auth/verify/email/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': access_token? `Bearer ${access_token}` : ''
    }
});

export const locationAPI = axios.create({
    baseURL: `${baseURL}address/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':  access_token? `Bearer ${access_token}` : ''
    }
})

export const storesAPI = axios.create({
    baseURL: `${baseURL}store/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':  access_token? `Bearer ${access_token}` : ''
    }
})

export const productsAPI = axios.create({
    baseURL: `${baseURL}product/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':  access_token? `Bearer ${access_token}` : ''
    }
})

export const honoredAPI = axios.create({
    baseURL: `${baseURL}honored/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':  access_token? `Bearer ${access_token}` : ''
    }
})

export const categoryAPI = axios.create({
    baseURL: `${baseURL}category/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':  access_token? `Bearer ${access_token}` : ''
    }
})

export const checkoutAPI = axios.create({
    baseURL: `${baseURL}checkout/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':  access_token? `Bearer ${access_token}` : ''
    }
})


export const cartAPI = axios.create({
    baseURL: `${baseURL}cart/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':  access_token? `Bearer ${access_token}` : ''
    }
})

export const orderAPI = axios.create({
    baseURL: `${baseURL}orders/`,
    headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':  access_token? `Bearer ${access_token}` : ''
    }
})

console.log('access', access_token)