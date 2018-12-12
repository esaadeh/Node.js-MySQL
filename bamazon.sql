DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Toothpaste', 'Household', 2.99, 50), ('Deodorant', 'Household', 3.99, 50), ('Laundey Detergent', 'Household', 8.99, 50), ('Canned Tuna', 'Grocery', 3.49, 50), ('Dry Pasta', 'Grocery', 1.99, 50 ), ('The Catcher in the Rye', 'Books', 7.99, 20), ('The Great Gatsby', 'Books', 8.99, 20), ('Pens', 'Office', 0.99, 100), ('Pencils', 'Office', 0.59, 100), ('Notebooks', 'Office', 2.99, 50);