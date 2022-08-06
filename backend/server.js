import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';

dotenv.config();

const app = express();

//2 Middlewares to convert http request body content to req.body in node app
//add new middleware which parse json data
app.use(express.json());

// the data set in body become the req
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1/amazona');

// Upload an image route
app.use('/api/uploads', uploadRouter)

// Home page route
app.get('/', (req, res) => {
    res.send('Server is ready');
});

// Send the paypal id that located in the be to the fe
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.use('/api/users', userRouter);

//Get products
app.use('/api/products', productRouter);

// Get the order products
app.use('/api/orders', orderRouter);

//Error catcher middleware
// All errors will be redirected to this function 
// app.use((err, req, res) => {
//     res.status(500).send({ message: err.message });
// });

// TODO SOLVE THIS ISSUE
// When next is removed res.statis is not a function appears in BE

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
// Show images after an upload
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
