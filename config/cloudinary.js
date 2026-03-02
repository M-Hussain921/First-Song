import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localFilePath) => {
    try {
       if (!localFilePath) {
      throw new Error("File path not found");
    }
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        });
        fs.unlinkSync(localFilePath);
return response;
    } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw error; 
  }
}  

export default cloudinary;