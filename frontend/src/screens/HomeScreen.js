import React, {  useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {
    
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const {loading, error, products} = productList;
    // useEffect is a hook that happens when your compnents rendered to the web page
    // After all components are rendered this function will run.

    useEffect(() => {
       dispatch(listProducts());
    }, [dispatch]);
    //Render section
    return (
        // if no loading and no error render the products
        <div>
            
            {loading ? (
             <LoadingBox></LoadingBox> 
             ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
            <div className="row center">
                {products.map((product) => (
                <Product key={product._id} product={product}></Product>
                ))}
            </div>
            )} 
        </div>
    );
}