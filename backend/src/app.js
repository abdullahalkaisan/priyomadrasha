

import express from 'express';
import cors from 'cors';
import organizationRoutes from './routes/organization_routes.js';
import searchRoutes from './routes/search_route.js';

const app = express();

// ✅ CORS configuration - MUST BE FIRST!
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://yourdomain.com' // Add production URL
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or Postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
                    'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true
    })
);

// ✅ Other Middleware - AFTER CORS
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// ✅ Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.use('/api/organizations', organizationRoutes);
app.use("/api/search", searchRoutes);


// ✅ Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ✅ Export app
export default app;
