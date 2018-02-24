DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id INTEGER (10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL (4,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (item_id)
	);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("apple", "produce", 1.25, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("orange", "produce", 1, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("banana", "produce", .25, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pear", "produce", 1.50, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cucumber", "produce", 1, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("peppers", "produce", 1.20, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pineapple", "produce", 4.5, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mango", "produce", 1.5, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chicken", "meat", 4, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pork chop", "meat", 3.5, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ribeye steak", "meat", 9.5, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lobster", "meat", 10, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("milk", "diary", 3, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cheese", "diary", 3.5, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("yogurt", "diary", 4, 40);