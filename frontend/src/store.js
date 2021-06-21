import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
//Redux-thunk make it possible to send ajax request in our redux actions 
import thunk from 'redux-thunk';
import {
    productListReducer,
    productDetailsReducer
} from './reducers/productReducers';



const initialstate = {};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
})

//Show redux window in redux dev tools in chrome
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialstate, composeEnhancer(applyMiddleware(thunk)));

export default store;