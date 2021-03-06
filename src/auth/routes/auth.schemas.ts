import Joi from '@hapi/joi';

export const userSchema = Joi.object({
  login: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const tokenSchema = Joi.object({
  refreshToken: Joi.string().required()
});

export const jwtSchema = Joi.object({
  login: Joi.string().required(),
  iat: Joi.number().required(),
  exp: Joi.number().required()
});

