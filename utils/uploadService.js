const cloudinary = require("../utils/cloudinary");

/**
 * Upload image buffer to Cloudinary
 * @param {Buffer} fileBuffer
 * @param {String} folder
 * @returns {Promise<String>} - secure_url
 */
const uploadImageToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
};

module.exports = { uploadImageToCloudinary };