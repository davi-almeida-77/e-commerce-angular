const db = require("../database/db");

const checkStock = async (id_product, quantity) => {
    try {
        const [result] = await db.promise().query(
            `SELECT stock FROM products_stock WHERE id_product = ?`,
            [id_product]
        );

        if (result.length === 0 || result[0].stock < quantity) {
            throw {
                message: "Insufficient stock",
                statusCode: 400,
            };
        }

        return result[0].stock;
    } catch (err) {
        throw {
            message: "Error checking stock",
            statusCode: 500,
            data: err,
        };
    }
};

const updateStock = async (id_product, quantity) => {
    try {
        await db.promise().query(
            `UPDATE products_stock SET stock = stock - ? WHERE id_product = ?`,
            [quantity, id_product]
        );

        return {
            message: "Updated Stock with Success",
            statusCode: 200,
        };
    } catch (err) {
        throw {
            message: "Error on Update Stock",
            statusCode: 500,
            data: err,
        };
    }
};

const generateOrderNumber = () => {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const randomString = Math.random().toString(36).substring(7).toUpperCase();
    return `${randomNumber}${randomString}${randomNumber}${randomString}${randomNumber}${randomString}`;
};

exports.createOrderService = async (params) => {

    // if ( !user_id ) throw {  message: "user_id was not provided", statusCode: 400 }
    // if ( !products ) throw {  message: "products was not provided", statusCode: 400 }

    const { user_id, products } = params;

    try {
        
        for (let i = 0; i < products.length; i++) {
            const { id_product, quantity } = products[i];
            await checkStock(id_product, quantity);
        }

        
        const [cartResult] = await db.promise().query(
            `INSERT INTO cart (id_user) VALUES (?)`,
            [user_id]
        );
        const cart_id = cartResult.insertId;

       
        const order_number = generateOrderNumber();

        
        const [orderResult] = await db.promise().query(
            `INSERT INTO order_ecommerce (order_number, id_user, id_cart) VALUES (?, ?, ?)`,
            [order_number, user_id, cart_id]
        );
        const order_id = orderResult.insertId;

       
        for (let i = 0; i < products.length; i++) {
            const { id_product, quantity } = products[i];

            
            await db.promise().query(
                `INSERT INTO order_product (id_order, id_product, quantity) VALUES (?, ?, ?)`,
                [order_id, id_product, quantity]
            );

            
            await updateStock(id_product, quantity);
        }

        return {
            message: "Create Order with Success",
            statusCode: 200,
        };
    } catch (error) {
        console.error('Error in Create Order: ', error);
        throw error;
    }
};
