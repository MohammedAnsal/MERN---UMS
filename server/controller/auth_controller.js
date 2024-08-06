import User from '../model/user_model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const signUp = async (req, res, next) => {  // SignUp User
    
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

export const signIn = async (req, res, next) => { // SignIn User
    
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return next(errorHandler(404, 'User not found'));

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials'));

        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);    //  Set JWT toekn

        const { password: hashPassword, ...rest } = user._doc
        
        const expiryDate = new Date(Date.now() + 3600000);  //  1 hour
        
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest); //  Set Cookies
        
    } catch (error) {

        next(error)
        
    }

};

export const google = async (req, res, next) => {   //  Google Auth

    try {

        const user = await User.findOne({ email: req.body.email });

        if (user) {
            
            const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
            
            const { password: hashPassword, ...rest } = user._doc
                    
            const expiryDate = new Date(Date.now() + 3600000);  //  1 hour
                    
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest); //  Set Cookies
            
        } else {
            
            const generatePassword = Math.random().toString(36).slice(-8);
            
            const hashPassword = bcryptjs.hashSync(generatePassword, 10);
            
            const newUser = new User({
                userName: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashPassword,
                profilePicture: req.body.photo
            });
            
            await newUser.save()
            
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN);
            
            const { password: hashPassword2, ...rest } = newUser._doc
                    
            const expiryDate = new Date(Date.now() + 3600000);  //  1 hour
                    
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest); //  Set Cookies

        }
        
    } catch (error) {

        next(error)
        
    }

};