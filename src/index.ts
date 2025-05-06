import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRoutes from './routes/user.routes';
import questionRoutes from './routes/question.routes';
import examRoutes from './routes/exam.routes';
import adminRoutes from './routes/admin.routes';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:3030", 
    "http://192.168.16.105:3000", 
    "http://192.168.16.105:7070", 
    "http://192.168.16.105:3030", 
    "http://192.168.16.105:5050",
    "http://192.168.16.105:5173",
    "http://192.168.1.238:5173",
    "http://192.168.1.238:3000",
    "http://localhost:5173",
    "http://localhost:7070",
  ];

// Middleware
app.use(
    cors({
      origin: (origin, callback) => {
        // Check if the origin is in the allowed list or is undefined (for non-browser requests)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Allow the request
        } else {
          callback(new Error("Not allowed by CORS")); // Block the request
        }
      },
      credentials: true, // Allow cookies and credentials
      
    })
  );
// app.use(cors());
// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

//Middleware for parsing form data
app.use(express.json()); // For parsing JSON request bodies
app.use(cookieParser()); // For parsing cookies

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/exams', examRoutes);
app.use('/api/v1/admin', adminRoutes);

// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, '../public')));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3030,'0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }); 