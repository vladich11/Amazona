import Axios from "axios"
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_FAIL
} from "../constants/productConstants"


// Get Products list 
export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    try {
        const { data } = await Axios.get('/api/products')
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
    }
}

// Get Products details 
export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })

    try {
        const { data } = await Axios.get(`/api/products/${productId}`)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            // If backend failed show backend error else general error
            payload:
                error.response && error.response.data.message
                    ? error.response.dat.message
                    : error.message
        })
    }
}


// Create product
export const createProduct = () => async (dispatch, getState) => {
    // Dispatch product create req
    dispatch({ type: PRODUCT_CREATE_REQUEST })
    // Get user info from userSignin
    const { userSignin: { userInfo } } = getState()
    // Ajax req
    try {
        // Ajax req
        const { data } = await Axios.post('/api/products', {},
            {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            })
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            // data.product is the object coming from the productRouter (product:createdProduct)
            payload: data.product
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.dat.message
            : error.message
        dispatch({ type: PRODUCT_CREATE_FAIL, payload: message })
    }
}


// Update product used in admin edit screen
export const updateProduct = product => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product })
    // Get token from userSignin 
    const { userSignin: { userInfo } } = getState()
    try {
        // Ajax req
        const { data } = await Axios.put(`/api/products/${product._id}`, product, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.dat.message
            : error.message
        dispatch({ type: PRODUCT_UPDATE_FAIL, error: message })
    }
}


// Delete product from product list
export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId })
    const {
        userSignin: { userInfo },
    } = getState()
    try {
        await Axios.delete(`/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        dispatch({ type: PRODUCT_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: message })
    }
}
