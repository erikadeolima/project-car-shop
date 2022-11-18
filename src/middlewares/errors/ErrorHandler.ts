import { ErrorRequestHandler } from 'express';

const ErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

export default ErrorHandler;