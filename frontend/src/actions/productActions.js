//instead of having ajax req we use action in redux

import Axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from "../constants/productConstants";

/* 
 Actions are the only source of information for the store as per Redux official documentation.
 It carries a payload of information from your application to store. As discussed earlier,
 actions are plain JavaScript object that must have a type attribute to indicate the type of action performed.
*/

/*
 dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. 
 This is the only way to trigger a state change. 
 With React Redux, your components never access the store directly - connect does it for you.
 */

// get all list products from db
export const listProducts = () => async dispatch => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    // fetch data from backend
    try {
        // Send ajax req to backend to fetch data using axios.
        const { data } = await Axios.get('api/products');
        //disptch action to change to state of redux to show products
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};
// get a specific list product from db
export const detailsProduct = productId => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                //if error.res exist it means backend failed and if error.response.data.message exist render error.response.data.message else error.message
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};