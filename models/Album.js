const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
  title: String,
  cover: {
    data: Buffer,
    contentType: String,
  },
  photos: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

module.exports = mongoose.model("Album", AlbumSchema);
