import React, { useEffect } from 'react'
import { addToCart } from '../actions/cartActions';
import { useDispatch } from 'react-redux';

export default function CartScreen(props) {

  //get the productId from api
  const productId = props.match.params.id;

  //get the qty from ProductScreen addToCartHandler dynamic path
  //get the second value by a split if qty exist else defuat value set to 1
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  const dispatch = useDispatch();

  // After all components are rendered this function will run once.
  //whenever u use a variable in useEffect u need to add cariable to dependency list of useEffect.
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductID: {productId} Qty: {qty}
      </p>
    </div>
  );
}
