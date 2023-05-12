const fs = require("fs");
const path = require("path");

async function deleteAllFilesOfUploadFolder() {
  const directoryPath = path.join(__dirname, "../uploads");

  // Read the directory and remove all files
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    // Iterate through the files and remove each one
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error removing file ${filePath}:`, err);
          return;
        }

        console.log(`File ${filePath} removed successfully`);
      });
    });
  });
}

module.exports = deleteAllFilesOfUploadFolder;
