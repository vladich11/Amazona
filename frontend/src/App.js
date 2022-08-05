import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { signout } from './actions/userActions';

import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';

function App() {

  //get acces to cart item from redux
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  // get user sign from store
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }
  return (
    <BrowserRouter>
      <div className="grid-container">

        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazona
            </Link>
          </div>
          <div>
            <Link to="/cart" >Cart</Link>
            {cartItems.length > 0 && (
              <span className='badge'>{cartItems.length}</span>
            )}
            {
              userInfo ? (
                <div className='dropdown'>
                  <Link to='#'>{userInfo.name}
                    <i className='fa fa-caret-down'></i>
                  </Link>
                  <ul className='dropdown-content'>
                    <li>
                        <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                    </li>
                    
                  </ul>
                </div>
              ) :
                (
                  <Link to="/signin">Sign In</Link>
                )
            }

          </div>
        </header>

        <main>
          <Routes>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>
            <Route path="/product/:id" element={<ProductScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route path='/profile' element={<ProfileScreen />}></Route>
            <Route path="/" element={<HomeScreen />} exact></Route>
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}
export default App;