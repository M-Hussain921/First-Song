import express from 'express';
const router=express.Router();

import {authMiddleware,isAdmin} from '../middleware/auth.middleware.js';
import {getalluser,deleteuser,restoreUser} from '../controller/admin.controller.js';

router.get('/all-users',authMiddleware,isAdmin,getalluser);
router.put('/delete-user/:id',authMiddleware,isAdmin,deleteuser);
router.put('/restore-user/:id',authMiddleware,isAdmin,restoreUser);

export default router;

