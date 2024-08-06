import User from "../model/user_model.js";

export const verifySignin = async (req, res, next) => {
    
    try {
        
        await User.findOne({ email: req.body.email, isAdmin: true });

        res.status(200).json('Sign In Successfully...')
        
    } catch (error) {

        console.log(error.message);
        
        
    }

};