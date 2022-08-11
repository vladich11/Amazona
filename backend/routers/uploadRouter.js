import multer from 'multer'
import express from 'express'

import { isAuth } from '../utils.js'

const uploadRouter = express.Router()

// Using storage on local project for images
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


// Define upload middleware
const upload = multer({ storage })


// Upload image
uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    // multer is expecting a single file named image
    res.send(`/${req.file.path}`)
})

export default uploadRouter
