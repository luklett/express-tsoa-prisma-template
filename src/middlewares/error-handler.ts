import { Response, Request, NextFunction } from 'express';
import { ValidateError } from 'tsoa';
import { registerError } from '../utils/register-error';
import Exception from '../config/exception';
import { statusCode } from '../config/status-const';

export const errorHandlerMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (!error) return next();

  registerError(error as Error);
  console.error(error);

  if (error instanceof ValidateError) {
    return res.status(statusCode.clientError.validationFail).json({
      message: 'Validation Failed',
      details: error?.fields
    });
  }

  if (error instanceof Exception) {
    return res.status(error.status).json({ message: error.message });
  } else if (error instanceof Error) {
    return res.status(statusCode.serverError.internalServerError).json({ message: error.message });
  } else {
    return res.status(statusCode.serverError.internalServerError).json(error);
  }
};
