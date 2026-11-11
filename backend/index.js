const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
   origin: [process.env.FRONTEND_URL]
}));

app.get("/", (req, res) => {
   res.send("app is working")
});

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {})
   .then(() => {
      console.log("Database connected successfully");
   })
   .catch((err) => {
      console.error("Database connection failed");
   });


const userRoutes = require("./routes/userRoutes");
const donorRoutes = require("./routes/donorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const bloodStockRoutes = require("./routes/bloodStockRoutes");
const requestRoutes = require("./routes/requestRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const donationHistoryRoutes = require("./routes/donationHistory");



app.use("/", userRoutes);
app.use("/", donorRoutes);
app.use("/", adminRoutes);
app.use("/", inventoryRoutes);
app.use("/", bloodStockRoutes);
app.use("/", requestRoutes);
app.use("/", hospitalRoutes);
app.use("/",donationHistoryRoutes);


app.use((err, req, res, next) => {
   console.error(err);
   res.status(500).json({
      message: "Internal server error"
   });
});


const PORT = process.env.PORT || 50333;

app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`);
});