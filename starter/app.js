const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logging middleware for development
}

app.use(morgan('dev')); // Logging middleware for development
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(`${__dirname}/public`)); // Serve static files from the public directory

app.use((req, res, next) => {
  console.log(`Request received at ${req.originalUrl} with method ${req.method}`);
  next(); // Call the next middleware or route handler
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); // Call the next middleware or route handler
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;