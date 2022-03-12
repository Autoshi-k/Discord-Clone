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

// Update Account Validation
export const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(37),
    email: Joi.string().min(2).email(),
    phoneNumber: Joi.number().min(10).max(10),
    password: Joi.string().min(2).required(),
    newPassword: Joi.string().min(2),
  })
  if (data.newPassword) {
    schema['confirm'] = Joi.string().min(2).required()
  }
  return schema.validate(data);
}