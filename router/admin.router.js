import express from 'express';
const router=express.Router();

import {authMiddleware,isAdmin} from '../middleware/auth.middleware.js';
import {getalluser,deleteuser,restoreUser,viewAllArtists,deletedArtists,allDeletedUsers} from '../controller/admin.controller.js';

router.get('/all-users',authMiddleware,isAdmin,getalluser);
router.get('/all-artists',authMiddleware,isAdmin,viewAllArtists);
router.get('/all-deleted-artists',authMiddleware,isAdmin,deletedArtists);
router.get('/all-deleted-users',authMiddleware,isAdmin,allDeletedUsers);
router.put('/delete-user/:id',authMiddleware,isAdmin,deleteuser);
router.put('/restore-user/:id',authMiddleware,isAdmin,restoreUser);

export default router;