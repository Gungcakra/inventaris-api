const express = require("express");
const db = require("../config/db");
const router = express.Router();


router.get("/", (req, res) => {
    db.query("SELECT * FROM pre_order", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


router.get("/:id", (req, res) => {
    db.query("SELECT * FROM pre_order WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Pre-order not found" });
        res.json(result[0]);
    });
});


router.post("/", (req, res) => {
    const { id_cabang, id_vendor, id_barang, qty, status } = req.body;
    db.query("INSERT INTO pre_order (id_cabang, id_vendor, id_barang, qty, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())", 
    [id_cabang, id_vendor, id_barang, qty, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Pre-order added", id: result.insertId });
    });
});


router.delete("/:id", (req, res) => {
    db.query("DELETE FROM pre_order WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Pre-order deleted" });
    });
});

module.exports = router;
