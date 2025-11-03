
// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Import app and database connection
import app from './app.js';
import connectDB from './config/database.js';

// Define port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
