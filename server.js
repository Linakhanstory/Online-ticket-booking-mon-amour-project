const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to MongoDB (The service on your computer)
mongoose
  .connect("mongodb://127.0.0.1:27017/monAmourDB")
  .then(() => console.log("✅ The Chef is connected to the Database!"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Define what a "Booking" looks like
const bookingSchema = new mongoose.Schema({
  ticketType: String,
  quantity: Number,
  totalPrice: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

// Create a 'Route' to save bookings
app.post("/save-booking", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(200).send("Booking saved successfully!");
  } catch (error) {
    res.status(500).send("Error saving booking");
  }
});

app.listen(5000, () => {
  console.log("🚀 Server is running on http://localhost:5000");
});
