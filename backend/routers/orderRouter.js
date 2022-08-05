//express.router function
import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';




const orderRouter = express.Router();

//get order list for current user
orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    //get orders from order model
    // await becouse find function returns a promise but we want the real orders not the promise
    const orders = await Order.find({ user: req.user._id })
    res.send(orders)
}))


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
                shippingPrice: req.body.shippingPrice,
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


// Get the details of the order 
//expressAsyncHandler() handle errors in async functions  
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    }
    else {
        res.status(404).send({ message: 'Order not Found!' })
    }
}))

// Update the status othe resourse (which is order)
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        // Save the order new details
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder })

    } else {
        res.status(404).send({ message: 'Order not Found' })
    }
}))

export default orderRouter;