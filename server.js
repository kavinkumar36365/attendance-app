const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = "random_string_here"; // replace with a strong secret

// Example Mongoose User model (not fully shown in conversation)
// const User = require('./models/User');

// Utility to get formatted UTC date/time (placeholder from conversation)
function getFormattedUtcDateTime() {
  const now = new Date();
  const utcYear = now.getUTCFullYear();
  const utcMonth = String(now.getUTCMonth() + 1).padStart(2, "0");
  const utcDay = String(now.getUTCDate()).padStart(2, "0");
  const utcHours = String(now.getUTCHours()).padStart(2, "0");
  const utcMinutes = String(now.getUTCMinutes()).padStart(2, "0");
  const utcSeconds = String(now.getUTCSeconds()).padStart(2, "0");
  return `${utcYear}-${utcMonth}-${utcDay} ${utcHours}:${utcMinutes}:${utcSeconds}`;
}

// GET /api/time to return the current UTC date/time in a JSON response
app.get('/api/time', (req, res) => {
  try {
    const currentTime = getFormattedUtcDateTime();
    res.status(200).json({ currentTimeUTC: currentTime });
  } catch (error) {
    console.error("Failed to get current UTC time:", error);
    res.status(500).json({ message: 'Error retrieving current time' });
  }
});

// POST /api/login to authenticate user and return a JWT
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }
    // Example: Find user by email
    // const user = await User.findOne({ email });
    // if (!user) return res.status(404).json({ message: 'User not found.' });

    // if (user.password !== password)
    //   return res.status(401).json({ message: 'Invalid credentials.' });

    // If valid, generate JWT (substitute user._id as appropriate)
    // For demonstration, we'll just return a mock token:
    const mockUserId = "12345";
    const token = jwt.sign({ userId: mockUserId }, JWT_SECRET, { expiresIn: '1h' });
    res.json({
      message: "Login successful",
      token: token,
      user: {
        id: mockUserId,
        email: email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Login failed.' });
  }
});

// Middleware to check JWT in Authorization header
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user = userPayload; 
    next();
  });
}

// GET /api/me to return the current user's profile
app.get('/api/me', authenticateToken, async (req, res) => {
  try {
    // For demonstration, just returning placeholders
    // In a real app, you'd retrieve the user's data from the database
    res.json({
      _id: req.user.userId,
      email: "example@example.com",
      name: "kavinkumar36365",
      rollNo: "1234",
      microsoftId: null 
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ message: 'Failed to retrieve user profile.' });
  }
});

// Connect to MongoDB (not shown in conversation) and start the server
// mongoose.connect('mongodb://localhost:27017/your_db_name', { ...options... });
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});