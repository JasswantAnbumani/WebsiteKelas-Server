const mongoose = require("mongoose");

const UangKasSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  bulan: { type: String, required: true },
  jumlah: { type: Number, default: 5000 },
  tanggal: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UangKas_Collection", UangKasSchema);
