import Axios from 'axios';
import { CART_ADD_ITEM } from "../constants/cartConstants";

// func to add to cart, getState for get state of redux store 
export const addToCart = (productId, qty ) => async(dispatch, getState)=> {
    //ajax req to server to get ingo about the product
    const {data} = await Axios.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        }
    });
    //save the cart to local storage
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));

}