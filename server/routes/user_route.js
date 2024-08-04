import express from 'express'
import { loadSignup } from '../controller/user_controller.js';

const router = express.Router()

router.get('/sign-up', loadSignup);

export default router