import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import cartReducer from './reducers/shoppingCart';
import userReducer from './reducers/user';
import siteReducer from './reducers/site';
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
    site: siteReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));
export default store;