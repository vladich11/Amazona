import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen() {

    const navigate = useNavigate();

    // get product id from url
    const params = useParams();
    const { id: productId } = params;

    //hooks for product fields
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')

    // get product details from redux store
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    // get updated product details from redux store
    const productUpdate = useSelector(state => state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = productUpdate

    const dispatch = useDispatch();
    // Dispatch an action
    useEffect(() => {
        // reset update if successUpdate exist
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/productlist')
        }

        // product exist => set values for hook
        if (!product || (product._id !== productId || successUpdate)) {
            // if product is null we need to load it from BE
            dispatch(detailsProduct(productId))

        } else {
            // else set fields with data from DB
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
        }
    }, [
        product,
        dispatch,
        productId,
        navigate,
        successUpdate
    ])

    const submitHandler = e => {
        e.preventDefault();
        // DISPATCH UPDATE PRODUCT action using a reducer
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            brand,
            countInStock,
            description
        }))
    }
    return (

        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                {loading ? <LoadingBox></LoadingBox>
                    : error ? <MessageBox variant='danger'>{error}</MessageBox>
                        :
                        <>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input
                                    id='name'
                                    type='text'
                                    placeholder='Enter name'
                                    defaultValue={name}
                                    onChange={e => setName(e.target.value)}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor='price'>Price</label>
                                <input
                                    id='price'
                                    type='text'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor='image'>Image</label>
                                <input
                                    id='image'
                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={e => setImage(e.target.value)}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor='category'>Category</label>
                                <input
                                    id='category'
                                    type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor='brand'>Brand</label>
                                <input
                                    id='brand'
                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={e => setBrand(e.target.value)}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor='countInStock'>Count In Stock</label>
                                <input
                                    id='countInStock'
                                    type='text'
                                    placeholder='Enter countInStock'
                                    value={countInStock}
                                    onChange={e => setCountInStock(e.target.value)}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor='description'>Description</label>
                                <textarea
                                    id='description'
                                    rows="3"
                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div>
                                <label></label>
                                <button className='primary' type='submit'>
                                    Update
                                </button>
                            </div>
                        </>
                }
            </form>
        </div>
    )
}
