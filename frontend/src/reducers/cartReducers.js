import {
    CART_ADD_ITEM, CART_EMPTY,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants'


/* Reducers are pure functions that take previous state and action (discuss later) and return the new state. */

// Cart reducer
export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            // get item from payload
            const item = action.payload;
            // add item to cart 
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                // If item exist replace old item with new item
                return {
                    // Not change other properties only update cart items.
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
                // If item not exist in cart add item
            } else {
                // Add new item at the end of cart items
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
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state, paymentMethod: action.payload
            };
        case CART_EMPTY:
            return { ...state, cartItems: [] };
        default:
            return state;
    }
};
