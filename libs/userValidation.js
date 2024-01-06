const Joi = require("joi");

const signupValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    });

    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    });

    return schema.validate(data);
};

module.exports = { signupValidation, loginValidation };
