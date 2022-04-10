import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            //get item from pyload
            const item = action.payload;
            //add item to cart 
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                //if exist replace old item with new item
                return {
                    // not change other properties only update cart items.
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
                // if item not exist in cart add item
            } else {
                // add new item at the end of cart items
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state, shippingAddress: action.payload
            };
        default:
            return state;
    }
};
