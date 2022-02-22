import { Request } from 'express';
import Joi from 'joi';

export const createUserSchema = Joi.object({
  body: Joi.object({
    userName: Joi.string().min(4).required(),
    userEmail: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    passConfirm: Joi.ref('password'),
  }).with('password', 'passConfirm'),
});

export const updateUserSchema = Joi.object<Request>({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    userName: Joi.string().min(4),
    userEmail: Joi.string().email(),
    password: Joi.string().min(6),
    status: Joi.boolean(),
  }),
});

export const getUserbyIdSchema = Joi.object<Request>({
  params: Joi.object({
    id: Joi.string().required(),
  }),
});
