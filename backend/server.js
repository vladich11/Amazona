import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1/amazona');


app.get('/', (req, res) => {
    res.send('Server is ready');
});


app.use('/api/users', userRouter);

//Get products
app.use('/api/products',productRouter);

//Error catcher middleware
// All errors will be redirected to this function 
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
