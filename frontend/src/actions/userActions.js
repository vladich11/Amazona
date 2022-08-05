import Axios from 'axios';
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
} from '../constants/userConstants';

export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        // ajax request to get register info
        const { data } = await Axios.post('/api/users/register', { name, email, password });
        // dispatch the data payload to reducer (action.payload)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        // Update store based on user signin (in app.js we read user signin to auth the user)
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        // Save login info in localstorage so when user restart brower the info will be saved
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        // ajax request to get signin info
        const { data } = await Axios.post('/api/users/signin', { email, password });
        // dispatch the data payload to reducer (action.payload)
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        // Save login info in localstorage so when user restart brower the info will be saved
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// Delete from localStorage when user sign out
export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: USER_SIGNOUT });
};


// Show user details

export const detailsUser = userId => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId })
    //getting tokem from getstate
    const { userSignin: { userInfo } } = getState()
    // ajax req
    try {
        //ajax req (real data when using await)
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        //success action / data is user information
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        //calling an action
        dispatch({ type: USER_DETAILS_FAIL, payload: message })
    }

}