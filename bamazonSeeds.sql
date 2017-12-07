DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;


USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price decimal(8,2) NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4","Electronics", 250, 10), ("Windows PC", "Electronics", 300,10), ("MacBook Pro", "Electronics", 1200,2),("XBOX 1","Electronics",250,10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("apple","Produce", 1.5, 100), ("orange", "Produce", 2,150), ("celery", "Produce", 1,200),("carrots","Produce",2,150);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("desk","Furniture", 599.99, 5), ("lamp", "Furniture", 75.50,11);
