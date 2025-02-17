const Joi = require('joi');

const RegisterValidation = (data) =>{
    const schema = Joi.object({
        u_name: Joi.string().required().strict(),
        f_name: Joi.string().required().strict(),
        l_name: Joi.string().required().strict(),
        email: Joi.string().email().required().strict(),
        password: Joi.string().min(6).required().strict(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    });
    return schema.validate(data)
}

const LoginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().email().required().strict(),
        password: Joi.string().min(6).required().strict(),
    });
    return schema.validate(data);  
}

const UpdateValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().email().required().strict(),
        password: Joi.string().min(6).required().strict(),
    });

    return schema.validate(data); 
}

module.exports = {
    RegisterValidation,
    LoginValidation,
    UpdateValidation,
};

