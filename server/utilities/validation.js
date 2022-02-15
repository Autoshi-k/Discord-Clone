// Validation
import Joi from '@hapi/joi';


// Register Validation
export const registerValidation = (data) => {
  const schema = Joi.object({
    displayName: Joi.string().min(2).required(),
    email: Joi.string().min(2).required().email(),
    password: Joi.string().min(2).required()
  });
  return schema.validate(data);
}

// Login Validation
export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(2).required().email(),
    password: Joi.string().min(2).required()
  })
  return schema.validate(data);
}
