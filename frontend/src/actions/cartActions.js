import Axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants'

/* dispatch is a function of the Redux store. You call store. dispatch to dispatch an action.
   This is the only way to trigger a state change. With React Redux, your components 
   never access the store directly - connect does it for you */

// Add product to cart 
export const addToCart = (productId, qty) => async (dispatch, getState) => {
    // Send ajax req
    const { data } = await Axios.get(`/api/products/${productId}`)
    // Req to redux store to add this item to the cart
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        },
    })
    // Save cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


// Remove product from cart 
export const removeFromCart = productId => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


// Save shipping address in localStorage 
export const saveShippingAddress = data => dispatch => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}


// Save payment method 
export const savePaymentMethod = data => dispatch => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
}