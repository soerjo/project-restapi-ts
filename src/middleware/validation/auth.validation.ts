import Joi from 'joi';

export interface IAuthBody {
  userName: string;
  userEmail: string;
  password: string;
  passConfirm: string;
}

export const registSchema = Joi.object({
  body: Joi.object<IAuthBody>({
    userName: Joi.string().min(4).required(),
    userEmail: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    passConfirm: Joi.ref('password'),
  }).with('password', 'passConfirm'),
});

export const loginSchema = Joi.object({
  body: Joi.object<IAuthBody>({
    userEmail: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});

export const forgotSchema = Joi.object({
  body: Joi.object<IAuthBody>({
    userEmail: Joi.string().email().required(),
  }),
});
