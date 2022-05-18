import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app = express();
//2 Middlewares to convert http request body content to req.body in node app
//add new middleware which parse json data
app.use(express.json());
// the data set in body become the req
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1/amazona');


app.get('/', (req, res) => {
    res.send('Server is ready');
});


app.use('/api/users', userRouter);

//Get products
app.use('/api/products', productRouter);
// Get the order products
app.use('/api/orderRouter', orderRouter);

//Error catcher middleware
// All errors will be redirected to this function 
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
