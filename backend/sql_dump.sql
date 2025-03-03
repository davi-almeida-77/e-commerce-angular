CREATE DATABASE ecommerce_db;
use ecommerce_db;

CREATE TABLE `user` (
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
    FOREIGN KEY (id_user) REFERENCES `user`(id)
);

CREATE TABLE `order_ecommerce` (
    id_order INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(255) NOT NULL, 
    order_status ENUM('PENDING', 'APPROVED') NOT NULL,
    id_user INT,
    id_cart INT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES `user`(id),
    FOREIGN KEY (id_cart) REFERENCES `cart`(id_cart)
);

CREATE TABLE `products` (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    p_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    product_desc TEXT,
    short_desc TEXT,
    image VARCHAR(355),  
    stock INT NOT NULL, 
    stock_status ENUM('IN_STOCK', 'OUT_OF_STOCK') NOT NULL DEFAULT 'IN_STOCK',
    category VARCHAR(100) NOT NULL
);


CREATE TABLE `order_product` (
    id_order INT,
    id_product INT,
    quantity INT NOT NULL,
    PRIMARY KEY (id_order, id_product),
    FOREIGN KEY (id_order) REFERENCES `order_ecommerce`(id_order),
    FOREIGN KEY (id_product) REFERENCES `product`(id_product)
);

INSERT INTO `cart` (id_user)
VALUES 
(1);  -- Penny é meu user 1 

INSERT INTO order_ecommerce (order_number, order_status, id_user, id_cart)
VALUES 
('ORD395138', 'PENDING', 1, 1); -- Criando pedido para Penny

INSERT INTO order_product (id_order, id_product, quantity) -- inserindo os Produtos no carrinho da Penny, 1 Carrinho, o produto de id 1 que é o Jordan 4, e a quantidade que é 3
VALUES 
(1, 1, 3),  -- Tenho que formatar o banco de dados para o iD DO Produto voltar do 1
(1, 2, 2), 
(1, 3, 1);  

-- Funçoes Complementares, Verificar Stock, Valor Total Pedido



