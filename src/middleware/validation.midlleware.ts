import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationError } from 'joi';
import log from '../utils/log';

class Validation {
  optionValidate = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  validation = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req, this.optionValidate);
    if (!error) return next();

    log.error(error, 'isi Error:');
    const { details } = error as ValidationError;
    return res.status(404).json({ error: [...details] });
  };
}

export const validation = new Validation().validation;
