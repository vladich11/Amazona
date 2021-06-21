import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
//Redux-thunk make it possible to send ajax request in our redux actions 
import thunk from 'redux-thunk';
import { productListReducers } from './reducers/productReducers';



const initialstate = {};
// return list of products
const reducer = combineReducers({
    productList: productListReducers,
})
//Show redux window in redux dev tools in chrome
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialstate, composeEnhancer(applyMiddleware(thunk)));

export default store;