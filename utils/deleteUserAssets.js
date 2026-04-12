const { deleteImageFromCloudinary } = require("./uploadService");

const deleteUserAssets = async (user) => {
  const promises = [];

  if (user.profileImage?.publicId) {
    promises.push(
      deleteImageFromCloudinary(user.profileImage.publicId)
    );
  }

  if (user.coverImage?.publicId) {
    promises.push(
      deleteImageFromCloudinary(user.coverImage.publicId)
    );
  }

  await Promise.all(promises);
};


module.exports = deleteUserAssets;