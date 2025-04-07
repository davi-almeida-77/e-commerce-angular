const { loginService, registerService, updateService, deleteService } = require('../services/authService'); 

exports.login_user = async (req, res, next) => {
    const { email, u_password } = req.body;

    loginService({ email, u_password })
    .then(( result ) => {
        console.log(result)
        const { statusCode = 200, message, data, token } = result;
        res.status( statusCode ).send( { message, data, token } )
    })
    .catch(( error ) => {
        
        const { statusCode = 400, message, data } = error;
        res.status( statusCode ).send( { message, data  } ) && next(error);
    })
}

exports.register_user = async (req, res, next) => {
    const {username, f_name, l_name,  email, u_password } = req.body;

    registerService({username, f_name, l_name,  email,  u_password })
    .then(( result ) => {
        console.log(result)
        const { statusCode = 200, message, data, token } = result;
        res.status( statusCode ).send( { message, data, token } )
    })
    .catch(( error ) => {
        const { statusCode = 400, message, data } = error;
        res.status( statusCode ).send( { message, data  } ) && next(error);
    })
}

exports.update_user = async (req, res, next) => {
    const { email, u_password, id, new_email, new_u_password } = req.body;

    updateService( { email,  u_password, id, new_email, new_u_password })
    .then(( result ) => {
        console.log(result)
        const { statusCode = 200, message, data, token } = result;
        res.status( statusCode ).send( { message, data, token } )
    })
    .catch(( error ) => {
        const { statusCode = 400, message, data } = error;
        res.status( statusCode ).send( { message, data  } ) && next(error);
    })
}

exports.delete = async (req, res, next) => {
    const { email, u_password, id } = req.body;

    deleteService( { email,  u_password, id })
    .then(( result ) => {
        console.log(result)
        const { statusCode = 200, message, data, token } = result;
        res.status( statusCode ).send( { message, data, token } )
    })
    .catch(( error ) => {
        const { statusCode = 400, message, data } = error;
        res.status( statusCode ).send( { message, data  } ) && next(error);
    })
}

