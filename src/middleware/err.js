const ErrorResponse = require("../Utils/errorResponse");
function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "CastError") {
    const message = "No poll found";
    error = new ErrorResponse(message, 400);
  }

  if (err.code == 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
    console.log(err);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  });
}
module.exports = errorHandler;
