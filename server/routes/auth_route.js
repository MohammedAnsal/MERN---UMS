import express from 'express'
import { loadSignup } from '../controller/auth_controller.js';

const router = express.Router()

router.get('/signup', loadSignup);

export default router