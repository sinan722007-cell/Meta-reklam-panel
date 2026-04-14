import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export interface ErrorResponse {
  error: string;
  message?: string;
  statusCode: number;
  timestamp: string;
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware
 */
export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.message) {
    message = err.message;

    // Handle specific error types
    if (err.message.includes('already exists')) {
      statusCode = 409;
    } else if (err.message.includes('not found')) {
      statusCode = 404;
    } else if (err.message.includes('unauthorized')) {
      statusCode = 401;
    } else if (err.message.includes('invalid')) {
      statusCode = 400;
    }
  }

  logger.error(`${statusCode} - ${message}`, err);

  const response: ErrorResponse = {
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
}

/**
 * 404 handler
 */
export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = new AppError(404, `Route ${req.originalUrl} not found`);
  next(error);
}
