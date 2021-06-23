import React from 'react'

export default function CartScreen(props) {

    //get the productId from api
    const productId = props.match.params.id;

    //get the qty from ProductScreen addToCartHandler dynamic path
    //get the second value by a split if qty exist else defuat value set to 1
    const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

    return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductID: {productId} Qty: {qty}
      </p>
    </div>
  );
}
