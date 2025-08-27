const express = require("express");
const router = express.Router();
const multer = require("multer");
const Album = require("../models/Album");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload album (cover + multiple photos)
router.post("/upload-album", upload.fields([
  { name: "cover", maxCount: 1 },
  { name: "photos", maxCount: 10 }
]), async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const { title } = req.body;

    const coverFile = req.files["cover"] ? req.files["cover"][0] : null;
    const photoFiles = req.files["photos"] || [];

    const newAlbum = new Album({
      title,
      cover: coverFile
        ? { data: coverFile.buffer, contentType: coverFile.mimetype }
        : null,
      photos: photoFiles.map(file => ({
        data: file.buffer,
        contentType: file.mimetype,
      })),
    });

    await newAlbum.save();
    res.json({ message: "Album uploaded successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all albums
router.get("/albums", async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete album
router.delete("/albums/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Album.findByIdAndDelete(id);
    res.json({ message: "Album deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
