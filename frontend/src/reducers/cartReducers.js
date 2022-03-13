import { CART_ADD_ITEM } from '../constants/cartConstants';

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
        default:
            return state;
    }
};
