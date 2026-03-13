import Song from "../models/song.models.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const createSong = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.file);

    const { title } = req.body;
    if (!req.file) {
      return res.status(404).json({ message: "Audio file is required" });
    }
    const audioFile = req.file;

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    console.log("Upload Response:", audioUpload);

    const newSong = await Song.create({
      title,
      artist: req.user.id,
      audioUrl: audioUpload.secure_url,
    });
    fs.unlinkSync(audioFile.path);

    res.status(201).json({
      message: "Song uploaded successfully",
      song: newSong,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
