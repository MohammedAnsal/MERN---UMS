import express from 'express'
import { verifySignin } from '../controller/admin_controller.js';

const router = express.Router()

router.post('/signin', verifySignin);

export default router