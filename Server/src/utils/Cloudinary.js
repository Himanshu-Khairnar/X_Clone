import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError";

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
})();


export const uploadImage = async (file) => {
  try {
      const uploadResult = await cloudinary.uploader
        .upload(file, {
          use_filename: true,
          resource_type: "auto"
          
        })
       
  } catch (error) {
    throw new ApiError(500, "Image upload failed");
  }
}