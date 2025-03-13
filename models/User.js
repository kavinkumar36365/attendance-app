const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  rollNo: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    default: 'student'
  },
  department: {
    type: String,
    default: ''
  },
  microsoftId: String,
  resetToken: String,
  resetTokenExpiry: Date,
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

// Add index for faster queries
UserSchema.index({ email: 1, rollNo: 1 });

module.exports = mongoose.model('User', UserSchema);