const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // log to console for developer
  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = new ErrorResponse(`Resource not found with id of ${err.value}`, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = new ErrorResponse(`Duplicate field value entered`, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server error' });
};

module.exports = errorHandler;
