const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,              // ✅ CHANGE HERE
  location: String,
  capacity: Number,
  attendees: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      phone: String
    }
  ],
  image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
