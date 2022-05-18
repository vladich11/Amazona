//express.router function
import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';
const orderRouter = express.Router();


// create a post request api
// the root is /api/orders
orderRouter.post(
    '/',
    //Middleware 
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            //Client error / validation error
            res.status(400).send({ message: 'Cart is empty' });
        }
        // The order is corret
        else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shppingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                // Define a middleware to get the user info that purchased this order
                user: req.user._id,
            });
            //Create that order in the DB      
            const createdOrder = await order.save();
            //pass the order to frontend
            res.status(201).send({ message: 'New order created', order: createdOrder });
        }
    }))

export default orderRouter;