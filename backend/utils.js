import jwt from 'jsonwebtoken';

// Get the user data and return the token
export const generateToken = user => {
    return jwt.sign({ 
        _id: user.id,
        name: user.name,
        email : user.email,
        isAdmin: user.isAdmin,
         
        },process.env.JWT_SECRET || 'somethingsecret', 
         {
            expiresIn : '30d', 
         }
         );
};