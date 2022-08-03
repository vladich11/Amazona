import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants"
import Axios from 'axios';
import { CART_EMPTY } from "../constants/cartConstants";


export const createOrder = order => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    // ajax req
    try {
        //get user info from redux store (getState return the entire redux store)
        const { userSignin: { userInfo } } = getState();
        // the data contain the msg and the order
        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        });
        // Create the order action
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
        // Remove all items from shopping cart action
        dispatch({ type: CART_EMPTY })
        // Remove cart items from local storage
        localStorage.removeItem("cartItems");
        
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }

}