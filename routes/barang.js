const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get all barang
router.get("/", (req, res) => {
  db.query("SELECT * FROM barang", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get barang by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM barang WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Barang not found" });
    res.json(result[0]);
  });
});

// Create barang
router.post("/", (req, res) => {
  const { id_vendor, id_cabang, name, price, stock } = req.body;
  db.query("INSERT INTO barang (id_vendor, id_cabang, name, price, stock) VALUES (?, ?, ?, ?, ?)", [id_vendor, id_cabang, name, price, stock], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Barang added", barangId: result.insertId });
  });
});

// Update barang
router.put("/:id", (req, res) => {
  const { id_vendor, id_cabang, name, price, stock } = req.body;
  db.query("UPDATE barang SET id_vendor=?, id_cabang=?, name=?, price=?, stock=? WHERE id=?", [id_vendor, id_cabang, name, price, stock, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Barang updated" });
  });
});

// Delete barang
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM barang WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Barang deleted" });
  });
});

module.exports = router;
