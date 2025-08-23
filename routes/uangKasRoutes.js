const express = require("express");
const router = express.Router();
const UangKas = require("../models/uangKas");

// Get semua kas
router.get("/", async (req, res) => {
  const kas = await UangKas.find();
  res.json(kas);
});

// Toggle bayar/batal
router.post("/toggle", async (req, res) => {
  const { nama, bulan } = req.body;

  const existing = await UangKas.findOne({ nama, bulan });
  if (existing) {
    await UangKas.deleteOne({ _id: existing._id });
    console.log(`❌ Pembayaran Dibatalkan Untuk: ${existing.nama}, Bulan: ${existing.bulan}`);
    return res.json({ message: "Pembayaran dibatalkan" });
  }

  const newKas = new UangKas({ nama, bulan });
  await newKas.save();
  res.json(newKas);
  res.send(console.log(`💵 Uang Kas Telah Diperbarui Untuk: ${nama}, Bulan: ${bulan}`))
});

module.exports = router;
