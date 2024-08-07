import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser, deletUserAccount,getUser } from '../controller/user_controller.js';

const router = express.Router()

router.get('/get', verifyToken, getUser);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deletUserAccount);

export default router