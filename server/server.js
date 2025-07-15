const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", orderRoutes);
app.use("/api/products", require("./routes/productRoutes"));



app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
