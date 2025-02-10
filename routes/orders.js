const express = require("express");
const db = require("../config/db");
const router = express.Router();


router.get("/", (req, res) => {
    db.query("SELECT * FROM `order`", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


router.post("/", (req, res) => {
    const { id_user, id_barang, qty, total } = req.body;
    db.query("INSERT INTO `order` (id_user, id_barang, qty, total, created_at) VALUES (?, ?, ?, ?, NOW())", 
    [id_user, id_barang, qty, total], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Order placed", id: result.insertId });
    });
});


router.delete("/:id", (req, res) => {
    db.query("DELETE FROM `order` WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Order deleted" });
    });
});

module.exports = router;
