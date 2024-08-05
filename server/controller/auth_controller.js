import User from '../model/user_model.js';

import bcryptjs from 'bcryptjs'

export const loadSignup = async (req, res, next) => {
    
    try {

        const { email, password, username } = req.body;
        
        const hashPassword = await bcryptjs.hash(password, 10)

        const newUser = new User({ email: email, userName: username, password: hashPassword })
        
        await newUser.save()

        res.status(201).json({ message: 'User Created Successfully' })
        
    } catch (error) {

        next(error)
        
    }

};