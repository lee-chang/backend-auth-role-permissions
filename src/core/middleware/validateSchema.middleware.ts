import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../interfaces/httpStatus.interface';
import { Schema } from 'zod';

export const validatorShema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: JSON.parse(result.error.message) });
    }

    req.body = result.data;

    next();
  };
};