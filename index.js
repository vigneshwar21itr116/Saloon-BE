const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000; // Use a different port for your backend

// Configure Express to parse JSON data
app.use(bodyParser.json());

// Enable CORS to allow requests from your React app
app.use(cors());

// Connect to your MongoDB database (replace 'your_connection_string' with your actual MongoDB URL)
mongoose.connect('mongodb+srv://praneeth:praneeth2004@cluster0.hplvp4p.mongodb.net/vicky?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Mongoose schema for the booking data
const bookingSchema = new mongoose.Schema({
  user: String,
  em: String,
  phone: String,
  appointmentDate: Date,
  decType: String,
  advancePayment: Boolean,
  additionalComments: String
  // Add other booking fields here
});

const Booking = mongoose.model('Booking', bookingSchema);

// Handle the POST request to save a booking
app.post('/submit-booking', async (req, res) => {
  try {
    const formData = req.body;

    // Create a new booking document using the Mongoose model
    const newBooking = new Booking(formData);

    // Save the booking to the database
    await newBooking.save();

    res.status(201).json({ message: 'Booking successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
