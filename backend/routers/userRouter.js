import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();


// base route is '/api/users',

// Seed DB with users 
userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        const createdUsers = await User.insertMany(data.users);
        res.send({ createdUsers });
    })
);


// User signin 
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                // when the return signin data we generate a token to auth the user for next req 
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });

})
);


// Register user
userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        // 8 for generating salt automaticlly
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
    });
})
);


// User details
userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User Not Found' })
    }
}))


// User profile
userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    // get user from DB
    const user = await User.findById(req.user._id)
    // user.name is the previous name before update
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            //encrypt new updated password
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        //save updated user
        const updatedUser = await user.save();
        // send the new info to FE
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        })

    }
}))

export default userRouter;