import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen() {

    // useNavigation is a hook which gives access to navigation object.
    const navigate = useNavigate();

    // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path> 
    const params = useParams();
    const { id: productId } = params;

    // This hook returns the current location object.
    const { search } = useLocation();

    // Get qty from url
    const qtyInUrl = new URLSearchParams(search).get('qty');
    const qty = qtyInUrl ? Number(qtyInUrl) : 1;

    // Get cart from redux store
    const cart = useSelector(state => state.cart);
    // Fetch cartitems from cart
    const { cartItems } = cart;

    // This hook returns a reference to the dispatch function from the Redux store
    const dispatch = useDispatch();

    // If productId exist add to cart
    useEffect(() => {
        if (productId)
            dispatch(addToCart(productId, qty));
    }, [dispatch, productId, qty]);


    // Remove product from cart handler
    const removeFromCartHandler = id => {
        // Delete action item from cart 
        dispatch(removeFromCart(id));
    }

    // Checkout handler - if user not signin redirect to signin else shipping screen
    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    };
    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
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
                                    <div>
                                        <select
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(item.product, Number(e.target.value))
                                                )
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>${item.price}</div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={checkoutHandler}
                                className="primary block"
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
