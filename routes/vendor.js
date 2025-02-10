const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM vendor", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM vendor WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0)
        return res.status(404).json({ message: "Vendor not found" });
      res.json(result[0]);
    }
  );
});

router.post("/", (req, res) => {
  const { name, address, telp } = req.body;
  db.query(
    "INSERT INTO vendor (name, address, telp) VALUES (?, ?, ?)",
    [name, address, telp],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Vendor added", id: result.insertId });
    }
  );
});

router.put("/:id", (req, res) => {
  const { name, address, telp } = req.body;
  db.query(
    "UPDATE vendor SET name = ?, address = ?, telp = ? WHERE id = ?",
    [name, address, telp, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Vendor updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM vendor WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Vendor deleted" });
    }
  );
});

module.exports = router;
