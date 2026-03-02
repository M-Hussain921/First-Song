import express from 'express';
const router=express.Router();
import {register,login} from '../controller/auth.controller.js';

router.post('/user/register',register);
router.post('/user/login',login);

export default router;