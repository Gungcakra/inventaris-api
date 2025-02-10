const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(result[0]);
  });
});

router.post("/", (req, res) => {
  const { username, email, role } = req.body;
  db.query("INSERT INTO users (username, email, role) VALUES (?, ?, ?)", [username, email, role], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User added", userId: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  const { username, email, role } = req.body;
  db.query("UPDATE users SET username=?, email=?, role=? WHERE id=?", [username, email, role, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User updated" });
  });
});

// Delete user
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted" });
  });
});

module.exports = router;
