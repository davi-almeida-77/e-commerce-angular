const { loginValidation, registerValidation } = require("../middleware/validation");
const db = require("../database/db");
const jwt = require('jsonwebtoken');

exports.loginService = async (params) => {
    try {
        const error = loginValidation(params); 
        
        if (error && error.details && error.details[0]) {
            throw { message: error.details[0].message, statusCode: 400 };
        }

        const { email, u_password } = params;

        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM users WHERE email = ? AND u_password = ?`,
                [email, u_password],
                (err, result) => {
                    if (err) {
                        return reject({
                            message: "Something went wrong, error name: " + err,
                            statusCode: 500,
                            data: err
                        });
                    }

                    if (result.length === 0) {
                        return reject({
                            message: "Invalid credentials, email or password incorrect",
                            statusCode: 401,
                        });
                    }

                    const token = jwt.sign({ data: result }, "secret");
                    resolve({
                        message: "Successful login",
                        data: result,
                        token,
                        statusCode: 200,
                    });
                }
            );
        });

    } catch (error) {
       
        console.error(' Error in LoginUser: ', error);
        throw error;
    }
};


exports.registerService = async (params) => {
    try {
        const error = registerValidation(params);

        if (error && error.details && error.details[0]) {
            throw { message: error.details[0].message, statusCode: 400 };
        }

        const { username, f_name, l_name, email, u_password } = params;

        return new Promise((resolve, reject) => {
            db.query(
                `SELECT email FROM users WHERE email = ?`,
                [email],
                (err, result) => {
                    if (err) {
                        reject({
                            message: "Something went wrong",
                            statusCode: 500,
                            data: err,
                        });
                    } else if (result.length > 0) {
                        reject({
                            message: "Email address is already in use",
                            statusCode: 400,
                        });
                    } else {
                        db.query(
                            `INSERT INTO users (username, f_name, l_name, email, u_password) VALUES (?, ?, ?, ?, ?)`,
                            [username, f_name, l_name, email, u_password],
                            (err, result) => {
                                if (err) {
                                    reject({
                                        message: "Something went wrong, please try again",
                                        statusCode: 500,
                                        data: err,
                                    });
                                } else {
                                    const token = jwt.sign({ data: result }, "secret");
                                    resolve({
                                        message: "You have successfully registered.",
                                        data: result,
                                        token,
                                        statusCode: 200,
                                    });
                                }
                            }
                        );
                    }
                }
            );
        });

    } catch (error) {
        
        console.error('Error in RegisterUser: ', error);
        throw error; 
    }
};

