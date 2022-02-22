import Joi from "joi";

export interface IAuthBody {
  userName: string;
  userEmail: string;
  password: string;
  passConfirm: string;
}

export const registSchema = Joi.object<IAuthBody>({
  userName: Joi.string().min(4).required(),
  userEmail: Joi.string().email().required(),
  password: Joi.string().email().required(),
  passConfirm: Joi.ref("password"),
}).with("password", "passConfirm");

export const loginSchema = Joi.object<IAuthBody>({
  userName: Joi.string().min(4).required(),
  userEmail: Joi.string().email().required(),
  password: Joi.string().email().required(),
});

export const forgotSchema = Joi.object<IAuthBody>({
  userName: Joi.string().min(4).required(),
  userEmail: Joi.string().email().required(),
});
