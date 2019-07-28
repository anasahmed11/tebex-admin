import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/shoppingCart';
import userReducer from './store/reducers/user';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

// For debugging
const logger = store => {
    return next => {
        return action => {
            //console.log("Middle-ware: ", action)
            return next(action);
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
                <Provider store={store}>
                    <BrowserRouter >
                        <App />
                    </BrowserRouter>
                </Provider>,    
                 document.getElementById('root')
            );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();