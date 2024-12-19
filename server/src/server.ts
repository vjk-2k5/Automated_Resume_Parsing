import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import authRoutes from './routes/auth';
import resumeRoutes from './routes/resume'; // Import resume routes

dotenv.config(); // Load environment variables from .env file

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

// Mount the auth routes
app.use('/api/auth', authRoutes);

// Mount the resume routes
app.use('/api/resume', resumeRoutes); // Add this line

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));