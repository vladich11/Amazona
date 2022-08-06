import multer from 'multer'
import express from 'express'

import { isAuth } from '../utils.js'

const uploadRouter = express.Router()

// using storage on local project for images
const storage = multer.diskStorage({
    destination(req, file, cb) {
        //callback , name of saving folder
        cb(null, 'uploads/')
    },
    // create file name
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`)
    }
})

//define upload middleware
const upload = multer({ storage })

// multer is expecting a single file named image
uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default uploadRouter

// import multer from 'multer';
// import express from 'express';
// import { isAuth } from '../utils.js';

// const uploadRouter = express.Router();

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename(req, file, cb) {
//         cb(null, `${Date.now()}.jpg`);
//     },
// });

// const upload = multer({ storage });

// uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
//     res.send(`/${req.file.path}`);
// });

// export default uploadRouter;