import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function HomeScreen() {
    //react hook state (use useState)
    const [products, setProducts] = useState([]);
    //Hook for loading default is false
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    //useEffect is a hook that happens when your compnents rendered to the web page
    //After all components are rendered this function will run.
    // because no dependency [] function will run only once.
    
    useEffect(() => {
       
        const fetchData = async () => {
            try{
                setLoading(true);
                // Send ajax req to backend to fetch data using axios.
               const { data } = await axios.get('api/products');
               setLoading(false);
               setProducts(data);
            }catch(error){
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
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