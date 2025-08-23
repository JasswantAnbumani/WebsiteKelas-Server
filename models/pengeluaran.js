const mongoose = require("mongoose");

const PengeluaranSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  jumlah: { type: Number, required: true },
  tanggal: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pengeluaran_Collection", PengeluaranSchema);
