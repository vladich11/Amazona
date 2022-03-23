import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import data from "../data.js"
const productRouter = express.Router();


// Get all products for homepage
//Empty object means get all the products
productRouter.get('/', expressAsyncHandler(async (req, res) => {
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
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    product ? res.send(product) : res.status(404).send({ message: 'Product Not Found' })

}))

export default productRouter;