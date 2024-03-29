import {
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELIVER_ORDER_FAIL,
    DELIVER_ORDER_REQUEST,
    DELIVER_ORDER_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
}
    from "../constants/orderConstants"
import Axios from 'axios'
import { CART_EMPTY } from "../constants/cartConstants"


// Create order
export const createOrder = order => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
    // ajax req
    try {
        //get user info from redux store (getState return the entire redux store)
        const { userSignin: { userInfo } } = getState()
        // the data contain the msg and the order
        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        })
        // Create the order action
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
        // Remove all items from shopping cart action
        dispatch({ type: CART_EMPTY })
        // Remove cart items from local storage
        localStorage.removeItem("cartItems")

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message ?
                    error.response.data.message :
                    error.message
        })
    }

}

// Get order details
export const detailsOrder = orderId => async (dispatch, getState) => {
    // getState get the token of the current user
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
    // From userSignin in redux store get user info
    const { userSignin: { userInfo } } = getState()
    // Ajax req
    try {
        // ajax req
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
    
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message })
    }
}


// Pay on order
export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } })
    // Get user info
    const { userSignin: { userInfo } } = getState()
    // Ajax req
    try {
        // Ajax req
        // Calling pay api
        const { data } = Axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })

        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        dispatch({ type: ORDER_PAY_FAIL, payload: message })
    }
}


// Get user history purchase list
export const listOrderMine = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST })
    // Get user info
    const { userSignin: { userInfo } } = getState()
    try {
        // Ajax req
        const { data } = await Axios.get('/api/orders/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        })
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message })
    }
}


// Get all order list
export const listOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST })
    const {
        userSignin: { userInfo },
    } = getState()
    try {
        const { data } = await Axios.get('/api/orders', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        console.log(data)
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({ type: ORDER_LIST_FAIL, payload: message })
    }
}


// Delete order
export const deleteOrder = (orderId) => async (dispatch, getState) => {

    dispatch({ type: DELETE_ORDER_REQUEST, payload: orderId })
    const {
        userSignin: { userInfo },
    } = getState()

    try {
        const { data } = Axios.delete(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        dispatch({ type: DELETE_ORDER_SUCCESS , payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({ type: DELETE_ORDER_FAIL, payload: message })
    }
}


// Deliver an order
export const deliverOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: DELIVER_ORDER_REQUEST, payload: orderId })
    // Get user info
    const { userSignin: { userInfo } } = getState()
    // Ajax req
    try {
        // Ajax req
        // Calling pay api
        const { data } = Axios.put(`/api/orders/${orderId}/deliver`,{}, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })

        dispatch({ type: DELIVER_ORDER_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        dispatch({ type: DELIVER_ORDER_FAIL, payload: message })
    }
}
