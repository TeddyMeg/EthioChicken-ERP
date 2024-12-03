import Joi from 'joi';

export const validateRegistration = (data) => {
  const baseSchema = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().required(),
    role: Joi.string().valid('admin', 'agent').required()
  };

  const adminSchema = Joi.object({
    ...baseSchema,
    employeeId: Joi.string().when('role', {
      is: 'admin',
      then: Joi.required()
    }),
    department: Joi.string().when('role', {
      is: 'admin',
      then: Joi.required()
    })
  });

  const agentSchema = Joi.object({
    ...baseSchema,
    company: Joi.string().when('role', {
      is: 'agent',
      then: Joi.required()
    }),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      region: Joi.string().required(),
      country: Joi.string().default('Ethiopia')
    }).when('role', {
      is: 'agent',
      then: Joi.required()
    })
  });

  if (data.role === 'admin') {
    return adminSchema.validate(data);
  }
  return agentSchema.validate(data);
};

export const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('admin', 'agent').required()
  });

  return schema.validate(data);
};