const { CLOUD_NAME, CLOUD_API_SECRET, CLOUD_API_KEY } = require("../src/configs/config");

const cloudinary = require("cloudinary").v2;



// Cloudinary config
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

module.exports = cloudinary;