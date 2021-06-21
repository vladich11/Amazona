import Axios from "axios";
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL 
} from "../constants/productConstants";

export const listProducts = () => async dispatch => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    // fetch data from backend
    try{
        // Send ajax req to backend to fetch data using axios.
        const { data } = await Axios.get('api/products');
        //disptch action to change to state of redux to show products
        dispatch({ type:PRODUCT_LIST_SUCCESS, payload:data });
    }catch(error){
        dispatch({ type: PRODUCT_LIST_FAIL, payload:error.message });
    }
}