const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM cabang", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM cabang WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0)
        return res.status(404).json({ message: "Branch not found" });
      res.json(result[0]);
    }
  );
});

router.post("/", (req, res) => {
  const { name, address } = req.body;
  db.query(
    "INSERT INTO cabang (name, address) VALUES (?, ?)",
    [name, address],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Branch added", id: result.insertId });
    }
  );
});

router.put("/:id", (req, res) => {
  const { name, address } = req.body;
  db.query(
    "UPDATE cabang SET name = ?, address = ? WHERE id = ?",
    [name, address, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Branch updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM cabang WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Branch deleted" });
    }
  );
});

module.exports = router;
