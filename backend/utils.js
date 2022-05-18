import jwt from 'jsonwebtoken';

// Get the user data and return the token
export const generateToken = user => {
    return jwt.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,

    }, process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    );
};

//Middleware to auth user

export const isAuth = (req, res, next) => {
    // Get the auth field from headers of this req
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);  // Bearer XXXXXX => return only token XXXXXX
        // use jwt to encrypt the token
        // 3 param is a callback function
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
                //Invalid token
                if (err) {
                    res.status(401).send({ message: 'Invalid Token' });
                    // Token is corret
                    // decode here is the info about this user 
                } else {
                    req.user = decode;
                    // By calling next we pass user as a property of a req to the next middleware (in our case in orderRouter)
                    next();
                }
            }
        );
    //authorization do not exist
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};