import bcryptjs from 'bcryptjs'

export const loadSignup = (req, res, next) => {
    
    try {

        res.send('Welcome')
        
    } catch (error) {

        next(error)
        
        
    }

};
