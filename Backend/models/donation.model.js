const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it references a user from a User model
    required: true,
    ref: 'User' // Reference to the User model
  },
  organizationName: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0 // Ensures the amount is non-negative
  },
  email:{
    type:String,
    required:true,
  },
  date: {
    type: Date,
    default: Date.now // Automatically sets the current date and time
  }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
