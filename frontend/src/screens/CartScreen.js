import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';

export default function CartScreen(props) {
    const params = useParams();
    const { id: productId } = params;


    //get qty from url
    const { search } = useLocation();
    const qtyInUrl = new URLSearchParams(search).get('qty');
    const qty = qtyInUrl ? Number(qtyInUrl) : 1;

    const dispatch = useDispatch();
    useEffect(() => {
        if (productId)
            dispatch(addToCart(productId, qty));

        // auto added to the depndencie list in useffect 
    }, [dispatch, productId, qty]);



    return (

        <div>
            <h1> Cart screen</h1>
            <p> ADD TO CART: ProductID: {productId} Qty: {qty}</p>
        </div >
    );
}
