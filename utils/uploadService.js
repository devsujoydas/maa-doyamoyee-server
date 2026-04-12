const cloudinary = require("./cloudinary");

// UPLOAD
const uploadImageToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      })
      .end(fileBuffer);
  });
};

// DELETE
const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  } catch (err) {
    console.error("Cloudinary delete failed:", err.message);
  }
};

module.exports = {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
};