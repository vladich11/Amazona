import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import data from "../data.js"
import { isAdmin, isAuth } from "../utils.js";
const productRouter = express.Router();


// Get all products for homepage
//Empty object means get all the products
productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.send(products);
    })
);

productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        //await Product.remove({});
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
    })
);

//Details product api
//If we place this api above /seed api will be treated as id 
productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        product ? res.send(product) : res.status(404).send({ message: 'Product Not Found' })

    }))

// Create products /api/products
productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        //create new product
        const product = new Product({
            name: 'sample name' + Date.now(),
            image: '/images/p1.jpg',
            price: 0,
            category: 'sample category',
            brand: 'sample brand',
            countInStock: 0,
            rating: 0,
            numReviews: 0,
            description: 'sample descrption',
        })
        //save the product in db
        const createdProduct = await product.save();
        //passing created product to fe
        res.send({ message: 'Product Created', product: createdProduct });
    }))


// Update product details

productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        // get id from url
        const productId = req.params.id
        //get product from db
        const product = await Product.findById(productId)
        //product exist
        if (product) {
            //fill product info by data from fe
            product.name = req.body.name
            product.price = req.body.price
            product.image = req.body.image
            product.category = req.body.category
            product.brand = req.body.brand
            product.countInStock = req.body.countInStock
            product.description = req.body.description
            //save new data
            const updatedProduct = await product.save()
            //send this object to fe
            res.send({ message: 'Product Updated', product: updatedProduct })
        } else {
            res.status(404).send({ message: 'Product Not Found' })
        }
    }))
export default productRouter;