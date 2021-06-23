import { CART_ADD_ITEM } from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            //check if item already exist
            const existItem = state.cartItems.find(x => x.product === item.product)
            //if item exist change qty to new value
            if (existItem) {
                return {
                    // ...state means do not change other property 
                    ...state,
                    //update only item that already exist else return the previous value.
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x)
                };
            } else {
                //add item to the cartItems, if 2 items in cart and add new one you will have 3.
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        default:
            return state;
    }
}