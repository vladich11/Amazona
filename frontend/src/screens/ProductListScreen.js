import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProduct, listProducts, deleteProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants'

export default function ProductListScreen() {

    const navigate = useNavigate()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    // Get data from productCreate from redux store
    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate


    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete, error: errorDelete,
        success: successDelete,
    } = productDelete

    const dispatch = useDispatch()

    useEffect(() => {
        //successfully created a product -> reset
        if (successCreate) {
            console.log("im in")
            dispatch({ type: PRODUCT_CREATE_RESET })
            navigate(`/product/${createdProduct._id}/edit`)
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET })
        }
        dispatch(listProducts())
    }, [createdProduct, dispatch, successCreate, navigate, successDelete])

    // Delete product handler
    const deleteHandler = (product) => {
        if (window.confirm('Are you sure to delete?'))
            dispatch(deleteProduct(product._id))
    }

    // Create product handler
    const createHandler = () => {
        console.log("im in createHandler")
        dispatch(createProduct());
        console.log(`The successCreated is ${successCreate}`)
    }
    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={createHandler}>
                    Create Product
                </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {/* // TODO FIX INIFINITE LOADING  */}
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() =>
                                            navigate(`/product/${product._id}/edit`)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => deleteHandler(product)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}