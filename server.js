const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://blastress05:Blast0512@cluster0.olat6pw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(console.log("Berhail Connect MongoDB"));

// Routes
const uangKasRoutes = require("./routes/uangKasRoutes");
const pengeluaranRoutes = require("./routes/pengeluaranRoutes");

app.use("/api/uangkas", uangKasRoutes);
app.use("/api/pengeluaran", pengeluaranRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
