const Joi = require('joi');

const registerValidation = (data) =>{
    const schema = Joi.object({
        username: Joi.string().required(),
        f_name: Joi.string().required(),
        l_name: Joi.string().required(),
        email: Joi.string().email().required(),
        u_password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('u_password')).required(),
    });
    return schema.validate(data)
}

const loginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        u_password: Joi.string().min(6).required(),
    });
    return schema.validate(data);  
}

const updateValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        u_password: Joi.string().min(6).required(),
    });

    return schema.validate(data); 
}

module.exports = {
    loginValidation,
    registerValidation,
    updateValidation,
};

