require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

connectDB();


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/rsvp', require('./routes/rsvpRoutes'));
app.use("/uploads", express.static("uploads"));



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
