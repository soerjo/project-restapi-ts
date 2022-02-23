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

    const { details } = error as ValidationError;
    // log.error(details);
    return res.status(400).json({ error: details.map((detail) => detail.message) });
  };
}

export const validation = new Validation().validation;
