import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

/* Browse Routing is used for doing client Side Routing with URL segments.
You can Load the top level component for each route.
This helps us too Seprate concerns in your app that makes the logical and data flow more clear. */

function App() {
    //get accses to cartItems from redux store
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;

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
                    <Link to="/cart">Cart
                    {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length} </span>
                    )}
                    </Link>
                    <Link to="/signin">Sign In</Link>
                </div>
            </header>
                <main>
                    <Route path="/cart/:id?" component={CartScreen}></Route>
                    <Route path="/product/:id" component={ProductScreen}></Route>
                    <Route path="/" component={HomeScreen} exact></Route>
                </main>
            <footer className="row center">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;