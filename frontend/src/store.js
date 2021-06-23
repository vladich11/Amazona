import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
//Redux-thunk make it possible to send ajax request in our redux actions 
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
    productListReducer,
    productDetailsReducer
} from './reducers/productReducers';


//get localstorage from cartAction and restart as initial state if exist else empty arr
const initialstate = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems'))
            : [],
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

//Show redux window in redux dev tools in chrome
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialstate, composeEnhancer(applyMiddleware(thunk)));

export default store;