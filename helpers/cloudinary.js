import { v2 as cloudinary } from 'cloudinary';
import HttpError from '../middlewares/HttpError.js';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Uploads an image to Cloudinary.
 *
 * @param {string} imagePath - The path of the image to upload
 * @return {string} The secure URL of the uploaded image
 */

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const CloudinaryUploadImage = async (imagePath) => {
  try {
      const result = await cloudinary.uploader.upload(imagePath, {
          use_filename: true,
          unique_filename: false,
          overwrite: true,
      });
      return result.secure_url;
  } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw HttpError(500, 'Cloudinary upload image error');
  }
};


export default CloudinaryUploadImage;