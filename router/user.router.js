import express from "express";
const router=express.Router();

import {authMiddleware} from "../middleware/auth.middleware.js";
import {viewSongByTitle,searchArtist} from "../controller/user.controller.js";

router.get('/search-song',authMiddleware,viewSongByTitle);
router.get('/search-artist',authMiddleware,searchArtist);

export default router;