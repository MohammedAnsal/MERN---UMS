import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs'
import User from '../model/user_model.js'

export const updateUser = async (req, res, next) => {
    
    try {

        if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can update only your account'));

        if (req.body.password) req.body.password = bcryptjs.hashSync(req.body.password, 10);
        
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
            
                userName: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture

            }
        }, { new: true });
        

        const { password1, ...rest } = updateUser._doc
        res.status(200).json(rest)
        
    } catch (error) {

        next(error)
        
    }

};