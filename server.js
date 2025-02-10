const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const usersRoutes = require("./routes/users");
const barangRoutes = require("./routes/barang");
const vendorRoutes = require("./routes/vendor");
const cabangRoutes = require("./routes/cabang");
const preOrderRoutes = require("./routes/pre_order");
const ordersRoutes = require("./routes/orders");

app.use("/api/users", usersRoutes);
app.use("/api/barang", barangRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/cabang", cabangRoutes);
app.use("/api/pre-order", preOrderRoutes);
app.use("/api/orders", ordersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
