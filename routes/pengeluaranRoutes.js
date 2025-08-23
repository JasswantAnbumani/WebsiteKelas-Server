const express = require("express");
const router = express.Router();
const Pengeluaran = require("../models/pengeluaran");

// Get semua pengeluaran
router.get("/", async (req, res) => {
  const list = await Pengeluaran.find();
  res.json(list);
});

// Tambah pengeluaran
router.post("/", async (req, res) => {
  const { nama, jumlah } = req.body;
  console.log("💸 Pengeluaran baru diterima:", { nama, jumlah });
  const pengeluaran = new Pengeluaran({ nama, jumlah });
  await pengeluaran.save();
  res.json(pengeluaran);
});

module.exports = router;
