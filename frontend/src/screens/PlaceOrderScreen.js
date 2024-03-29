import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen() {

  const navigate = useNavigate();

  // Fetch cart from redux store
  const cart = useSelector(state => state.cart);

  // If the paymend method is not chosen redirect back to payment method screen(when enter placeOrder screen)
  if (!cart.paymentMethod) {
    navigate('/payment');
  }
  // Order create object from redux store
  const orderCreate = useSelector(state => state.orderCreate);

  // From orderCreate extract this values
  const { loading, success, error, order } = orderCreate;

  // Help function to round number to 2 number after decimal point  5.123 => "5.12" => 5.12
  const toPrice = num => Number(num.toFixed(2));

  // Cal to sum of the order
  cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));

  // If item cost more than $100 shipping price is 0$
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);

  // Tax price is 15% of total order
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();

  // If user is placed order succesfully redirect to order and reset the cart
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [dispatch, success, navigate, order]);


  const placeOrderHandler = () => {
    // Action create order return cart as a premeter 
    // Rename cart items to order items becouse BE expect orderItems and not cart items
    // Use all fields of cart items and rename cartItems to orderItems
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
  }

  return (


    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <div className='row top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address</strong> {cart.shippingAddress.address} ,
                  {cart.shippingAddress.city} ,  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>

            <li>
              <div className='card card-body'>
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>


            <li>
              <div className='card card-body'>
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>

                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <h2>Order Summary</h2>

              </li>
              <li>
                <div className='row'>
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Order Total:</div>
                  <div>${cart.totalPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <button type='button' onClick={placeOrderHandler} className='primary block' disabled={cart.cartItems.length === 0}>
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
