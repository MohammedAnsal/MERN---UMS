import User from "../model/user_model.js";
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs'

export const verifySignin = async (req, res, next) => {     //  For Admin SignIn
    
    try {
        
        const admin = await User.findOne({ email: req.body.email, isAdmin: true });
        
        if (!admin) return next(errorHandler(401, 'Somthing Went Wrong!!!'));

        res.status(200).json('Sign In Successfully...')
        
    } catch (error) {

        console.log(error.message);
        
        
    }

};

export const usersData = async (req, res, next) => {    //  For Fetch All Users Data 
    
    try {

        const data = await User.find({isAdmin : false});
        res.status(200).json(data);
        
    } catch (error) {

        next(error)
        
    }

};

export const getUser = async (req, res, next) => {   //  For Single User Get
    
    try {

        const user = await User.findOne({ _id: req.params.id });
        res.status(200).json(user);
        
    } catch (error) {

        next(error)
        
    }

};

export const editUser = async (req, res, next) => { //  For User Edit
    
    try {

        const { username, email, profilePicture } = req.body;

        if (req.body.password) req.body.password = bcryptjs.hashSync(req.body.password, 10);

        const userEdit = await User.findByIdAndUpdate(req.params.id, {
            $set: {
            
                userName: username,
                email: email,
                password: req.body.password,
                profilePicture: profilePicture

            }
        }, { new: true });

        const { password, ...rest } = userEdit._doc;
        res.status(200).json(rest);
                
    } catch (error) {

        next(error)
        
    }

};

export const deleteUser = async (req, res, next) => {   //  For Delete User
    
    try {

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User Delete Successfully...');
        
    } catch (error) {
        
        next(error)

    }

};

export const addUser = async (req, res, next) => {
    
    try {

        const { username, email, password } = req.body;

        const hashPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({

            userName: username,
            email: email,
            password: hashPassword

        });

        newUser.save()
        res.status(200).json('Add User Successfully');
        
    } catch (error) {

        next(error)
        
    }

};