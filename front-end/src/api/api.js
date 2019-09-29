import axios from 'axios';
import Cookies from 'universal-cookie';
import globalVariables from '../global-variables';
import { initCart } from '../store/actions/shoppingCart';
import { initUser } from '../store/actions/user';
import { openPopup } from '../store/actions/site';
import store from '../store/store'; 

const cookies = new Cookies();

export const baseURL = "http://localhost:8000/";
export const apiURL = baseURL + "api/";

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

export const governorateAPI = axios.create({
    baseURL: `${apiURL}governorate/`,
    headers: headers
})
instances.push(governorateAPI)

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

export const specAPI = axios.create({
    baseURL: `${apiURL}specs/`,
    headers: headers
});
instances.push(specAPI)

export const affiliateAPI = axios.create({
    baseURL: `${apiURL}affiliate/`,
    headers: headers
});
instances.push(affiliateAPI)

export const sellerAPI = axios.create({
    baseURL: `${apiURL}seller/`,
    headers: headers
});
instances.push(sellerAPI)

export const paymentAPI = axios.create({
    baseURL: `${apiURL}payment/`,
    headers: headers
})
instances.push(paymentAPI)

export const withdrawAPI = axios.create({
    baseURL: `${apiURL}withdraw/`,
    headers: headers
})
instances.push(withdrawAPI)


instances.forEach(intance => {
    intance.interceptors.request.use(function (config) {
        config.headers.Authorization = cookies.get(globalVariables.ACCESS_TOKEN) ? `Bearer ${cookies.get(globalVariables.ACCESS_TOKEN)}` : '';

        return config;
    }, function (err) {
        return Promise.reject(err);
    });
    intance.interceptors.response.use(function (response) {
        //console.log("response",response)

        return response

    }, function (err) {
        if (err.response ){
            if(err.response.status === 401){
                if(cookies.get(globalVariables.ACCESS_TOKEN)!==undefined){
                    cookies.remove(globalVariables.ACCESS_TOKEN)
                    setTimeout(()=>window.location.replace('/'),1000);
                    store.dispatch(openPopup("Your session has been expired, login again")); 
                }
               
                initCart()
                initUser()
               
            }
        }
        
        else if (err.request){
            store.dispatch(openPopup("Server Connection is lost, try again later", true))
        }
        return Promise.reject(err);
    });
})

