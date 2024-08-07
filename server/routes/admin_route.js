import express from 'express'
import { addUser, deleteUser, editUser, getUser, usersData, verifySignin } from '../controller/admin_controller.js';

const router = express.Router()

router.post('/signin', verifySignin);
router.get('/getusers', usersData)
router.get('/getuser/:id', getUser);
router.post('/edituser/:id', editUser);
router.delete('/deleteuser/:id', deleteUser);
router.post('/adduser', addUser);

export default router