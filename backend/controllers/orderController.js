const { createOrderService } = require('../services/orderService');

exports.create_order = async (req, res, next) => {
    const { user_id, products } = req.body;  

    if (!products || products.length === 0) {
        return res.status(400).send({ message: 'No products found in the order' });
    }

    try {

        const result = await createOrderService({ user_id, products });
        

        const { statusCode = 200, message, data } = result;
        res.status(statusCode).send({ message, data });
    } 
    catch (error) {

        const { statusCode = 400, message, data } = error;
        res.status(statusCode).send({ message, data });
        next(error);
    }
};
