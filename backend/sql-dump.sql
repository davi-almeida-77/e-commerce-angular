CREATE DATABASE ecommerce_db;
USE ecommerce_db;


CREATE TABLE `users` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR (255) NOT NULL,
    f_name VARCHAR(255) NOT NULL,
    l_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    u_password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `cart` (
    id_cart INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES `users`(id) ON DELETE CASCADE
);

CREATE TABLE `order_ecommerce` (
    id_order INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(255) NOT NULL, 
    id_user INT,
    id_cart INT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES `users`(id) ON DELETE CASCADE,  
    FOREIGN KEY (id_cart) REFERENCES `cart`(id_cart) ON DELETE CASCADE  
);

CREATE TABLE `products` (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    p_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    product_desc TEXT,
    image VARCHAR (355),
    category VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    avaliation DECIMAL(2, 1)
);

CREATE TABLE `product_images` (
    id_image INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL, 
    image_type ENUM('side', 'sole', 'otherside', 'top', 'front', 'back') NOT NULL, 
    FOREIGN KEY (product_id) REFERENCES products(id_product) ON DELETE CASCADE
);

CREATE TABLE `products_stock` (
    id_product INT PRIMARY KEY,
    stock INT NOT NULL,
    FOREIGN KEY (id_product) REFERENCES `products`(id_product) ON DELETE CASCADE
);

CREATE TABLE `order_product` (
    id_order INT,
    id_product INT,
    quantity INT NOT NULL,
    PRIMARY KEY (id_order, id_product),
    FOREIGN KEY (id_order) REFERENCES `order_ecommerce`(id_order) ON DELETE CASCADE,  
    FOREIGN KEY (id_product) REFERENCES `products`(id_product) ON DELETE CASCADE  
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255), 
    title VARCHAR(255) NOT NULL,
    preview VARCHAR(255),
    content TEXT NOT NULL,
    image VARCHAR(255),
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
