import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { DELIVER_ORDER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderScreen() {

    // Hook for getting the status of paypal SDK
    const [sdkReady, setSdkReady] = useState(false);

    const params = useParams();
    const { id: orderId } = params;

    /// Fetch orderDeatils from redux store 
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    // Get userInfo from redux store
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    // Fetch orderPay from redux store 
    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

    // Fetch orderDeliver from redux store 
    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, error: erroreliver, success: successeDeliver } = orderDeliver;
    
    const dispatch = useDispatch();

    // When there in a change in order, orderId, sdkReady this function will run
    useEffect(() => {
        // Async becouse it send a req to BE TO GET THE CLIENT id
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            // Script element set the sourse of elemnet to the paypal SDK
            const script = document.createElement('script');
            script.type = "text/javascript"
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
            script.async = true;
            // Onload happens when this script is done loading into the browser
            script.onload = () => {
                setSdkReady(true);
            }
            // All code will become last child of body 
            document.body.appendChild(script);
        }
        // Order not loaded,  user paid for item , order exist yet not equals to the orderID(in the url)
        if (!order || successPay || successeDeliver|| (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: DELIVER_ORDER_RESET })
            // Load order from be
            // When successPay is true the page is needed to be refreshed
            dispatch(detailsOrder(orderId))
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    // Unpaid order and paypal is already loaded
                    setSdkReady(true);
                }
            }
        }

    }, [dispatch, order, orderId, sdkReady, successPay, successeDeliver]);


    const successPaymentHandler = paymentResult => {
        // Payment result is the result of palpal
        // This function is coming from order actions
        dispatch(payOrder(order, paymentResult))
    }

    // Deliver handler
    const deliverHandler = () => {
        dispatch(deliverOrder(order._id))
    }

    return loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (
                <div>
                    <h1>Order {order._id} </h1>
                    <div className='row top'>
                        <div className='col-2'>
                            <ul>
                                <li>
                                    <div className='card card-body'>
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                            <strong>Address</strong> {order.shippingAddress.address} ,
                                            {order.shippingAddress.city} ,  {order.shippingAddress.postalCode},
                                            {order.shippingAddress.country}
                                        </p>
                                        {order.isDelivered ?
                                            <MessageBox variant="success">Deliverd at {order.deliveredAt}</MessageBox>
                                            : <MessageBox variant="danger">Not delivered</MessageBox>
                                        }
                                    </div>
                                </li>

                                <li>
                                    <div className='card card-body'>
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method:</strong> {order.paymentMethod}
                                        </p>
                                        {order.isPaid ?
                                            <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                            : <MessageBox variant="danger">Not Paid</MessageBox>
                                        }
                                    </div>
                                </li>


                                <li>
                                    <div className='card card-body'>
                                        <h2>Order Items</h2>
                                        <ul>
                                            {order.orderItems.map((item) => (
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
                                            <div>${order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div>Shipping</div>
                                            <div>${order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div>Tax</div>
                                            <div>${order.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div>Order Total:</div>
                                            <div>${order.totalPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>
                                                {!sdkReady ? (<LoadingBox></LoadingBox>)
                                                    : (
                                                        <>
                                                            {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                                            {loadingPay && <LoadingBox></LoadingBox>}
                                                            <PayPalButton
                                                                amount={order.totalPrice}
                                                                onSuccess={successPaymentHandler}>
                                                            </PayPalButton>
                                                        </>
                                                    )}
                                            </li>
                                        )
                                    }
                                    {
                                        userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                            <li>
                                                <button type='button' className='primary block' onClick={deliverHandler}>Deliver Order </button>
                                            </li>
                                        )
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
}
