const db = require('../database/db'); 

const getProductDetailsById = async (id_product) => {
  try {
    const [productDetails] = await db.promise().query(
      `SELECT id_product, p_name, product_desc, price, image FROM products WHERE id_product = ?`,
      [id_product]
    );

    if (productDetails.length === 0) {
      throw { message: "Product not found", statusCode: 404 };
    }

    return productDetails[0];
  } catch (err) {
    throw {
      message: 'Error retrieving product details',
      statusCode: 500,
      data: err,
    };
  }
};

const getMostSoldProducts = async () => {
  try {
    const [products] = await db.promise().query(
      `SELECT id_product, stock FROM products_stock`
    );

    const INITIAL_STOCK = 50;

    const soldQuantities = products.map(product => {
      const sold = INITIAL_STOCK - product.stock;
      return { ...product, sold };
    });

    soldQuantities.sort((a, b) => b.sold - a.sold);

    const mostSold = soldQuantities.slice(0, 5);


    const detailedProducts = [];
    
    for (let product of mostSold) {
      const productDetails = await getProductDetailsById(product.id_product);
      detailedProducts.push({ ...product, ...productDetails });
    }

    return detailedProducts;

  } catch (err) {
    throw {
      message: 'Error calculating most sold products',
      statusCode: 500,
      data: err,
    };
  }
};

module.exports = { getMostSoldProducts };
