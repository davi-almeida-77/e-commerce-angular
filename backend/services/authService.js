const { loginValidation, registerValidation, updateValidation } = require("../middleware/validation");
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

exports.updateService = async (params) => {
    try {
        const error = updateValidation(params);

        if (error && error.details && error.details[0]) {
            throw { message: error.details[0].message, statusCode: 400 };
        }

        const { id, email, u_password, new_email, new_u_password } = params;

        if ( !new_email || !new_u_password ) {
            return reject({
                message: "New email and new password are required",
                statusCode: 400
            });
        }
        
        return new Promise((resolve, reject) => {

            db.query(
                `SELECT * FROM users WHERE id = ? AND email = ? AND u_password = ?`,
                [id, email, u_password],
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


                    db.query(
                        `UPDATE users SET email = ?, u_password = ? WHERE id = ?`,
                        [new_email, new_u_password, id],
                        (err, updateResult) => {
                            if (err) {
                                return reject({
                                    message: "Error while updating user data: " + err,
                                    statusCode: 500,
                                    data: err
                                });
                            }


                            if (updateResult.affectedRows > 0) {
                                resolve({
                                    message: "User data updated successfully",
                                    statusCode: 200,
                                    data: updateResult
                                });
                            } else {
                                reject({
                                    message: "No rows affected, update failed",
                                    statusCode: 400
                                });
                            }
                        }
                    );
                }
            );
        });

    } catch (error) {
        console.error('Error in Update User: ', error);
        throw error;
    }
};

exports.deleteService = async (params) => {

        const { id, email, u_password } = params;

        return new Promise((resolve, reject) => {

        db.query(
            `DELETE FROM order_product WHERE id_order IN (SELECT id_order FROM order_ecommerce WHERE id_cart IN (SELECT id_cart FROM cart WHERE id_user = ?));`,
            [id],
            (err, orderDeleteResult ) => {
                if ( err ) {
                    return reject ({
                        message: "Error while deleting user's order product data: " + err,
                        statusCode: 500,
                        data: err
                    })
                }
            }
        )
    
        db.query(
            `DELETE FROM order_ecommerce WHERE id_cart IN (SELECT id_cart FROM cart WHERE id_user = ?);`,
            [id],
            (err, orderDeleteResult ) => {
                if ( err ) {
                    return reject ({
                        message: "Error while deleting user's order data: " + err,
                        statusCode: 500,
                        data: err
                    })
                }
            }
        )

        db.query(
            `DELETE FROM cart WHERE id_user = ?;`,
            [id],
            ( err, cartDeleteResult ) => {
                if ( err ) {
                    return reject( {
                        message: "Error while deleting user's cart data: " + err,
                        statusCode: 500,
                        data: err
                    });
                }
            }
        )

            db.query(
                `SELECT * FROM users WHERE email = ? AND u_password = ? AND id = ?`,
                [email, u_password, id],
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


                    db.query(
                        `DELETE FROM users WHERE id = ?;`,
                        [id],
                        (err, updateResult) => {
                            if (err) {
                                return reject({
                                    message: "Error while updating user data: " + err,
                                    statusCode: 500,
                                    data: err
                                });
                            }


                            if (updateResult.affectedRows > 0) {
                                resolve({
                                    message: "User data updated successfully",
                                    statusCode: 200,
                                    data: updateResult
                                });
                            } else {
                                reject({
                                    message: "No rows affected, update failed",
                                    statusCode: 400
                                });
                            }
                        }
                    );
                }
            );
        });

};