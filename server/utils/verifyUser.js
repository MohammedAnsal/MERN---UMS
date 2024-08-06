import { errorHandler } from './error.js';
import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    
    try {
        
        const token = req.cookies.access_token;

        if (!token) return next(errorHandler(401), 'Your are not authenticated!');

        jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
            
            if (err) return next(errorHandler(403, 'Token is not valid!'));

            req.user = user
            next()

        })
        
    } catch (error) {

        console.log(error.message);
        
    }

};