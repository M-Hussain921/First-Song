import express from "express";
const router = express.Router();
import { createSong } from "../controller/artist.controller.js";
import { authMiddleware, isArtist } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

router.post(
  "/create-song",
  authMiddleware,
  isArtist,
  upload.single("audio"),
  createSong,
);

export default router;
