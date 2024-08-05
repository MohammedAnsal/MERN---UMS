import express from 'express'
import { loadSignup } from '../controller/auth_controller.js';

const router = express.Router()

router.post('/signup', loadSignup);

export default router