const fs = require("fs");
module.exports = async function (req, res, next) {
  try {
    if (!req.files || Object.keys(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No files" });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(files.tempFilePath);
        return res.status(400).json({ message: "Invalid file type" });
      }
      if (file.size > 1024 * 1024 * 5) {
        removeTmp(files.tempFilePath);
        return res.status(400).json({ message: "File size is too big" });
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};
