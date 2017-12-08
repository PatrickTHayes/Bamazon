var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon"
});



connection.connect(function(err) {
    if (err) throw err;
    intro();
});

function intro() {
    inquirer
        .prompt([{ //get user input on what to do
            type: 'list',
            name: 'theme',
            message: 'What do you want to do now?',
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product'
            ]
        }, ])
        .then(answers => {
            switch (answers.theme) { //logic on what function should be run based on user input
                case 'View Products for Sale':
                    // code
                    displayAll();
                    break;
                case 'View Low Inventory':
                    // code
                    displayLow();
                    break;
                case 'Add to Inventory':
                    // code
                    update();
                    break;
                case 'Add New Product':
                    create();
                    // code
                    break;
                default:
                    // code
            }
        });
}

function displayAll() {
    connection.query("SELECT * FROM products", function(err, res) { //select all from products table in MySQL
        if (err) throw err;
        //console.log(res);
        var table = new Table({ //create table through the cli-table
            head: ['id', 'product name', 'department name', 'price', 'quantity stocked'],
            colWidths: [6, 25, 25, 10, 18],
            style: { compact: true, 'padding-left': 1 }
        });
        for (var i = 0; i < res.length; i++) { //input data into the cli table
            table.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity], []
            )
        }
        console.log(table.toString());
        intro();
    })
}

function displayLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 4", function(err, res) { //select all with quantity <5
        var table = new Table({ //put raw data into a table
            head: ['id', 'product name', 'department name', 'price', 'quantity stocked'],
            colWidths: [6, 25, 25, 10, 18],
            style: { compact: true, 'padding-left': 1 }
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity], []
            )
        }
        console.log(table.toString());
        intro();
    })
}

function update() {
    connection.query("SELECT product_name FROM products", function(err, res) { // get product choices to update
        var products = []; //store in variable for prompt
        for (var i = 0; i < res.length; i++) {
            products.push(res[i].product_name);
        }
        inquirer //get choice and quantity to update
            .prompt([{
                type: 'list',
                name: 'products',
                message: 'Which product do you want to update?',
                choices: products
            }, {
                type: 'input',
                name: 'additional',
                message: 'How many are being added?'
            }])
            .then(answers => {
                connection.query("SELECT id,stock_quantity FROM products WHERE product_name='" + answers.products + "'", function(err, res) {
                    //get id and original amount of the stock
                    var quanTotal = parseInt(answers.additional) + parseInt(res[0].stock_quantity); //add together
                    connection.query("UPDATE products SET ? WHERE ?", [{ //set the new quantity
                        stock_quantity: quanTotal
                    }, {
                        id: res[0].id
                    }], function(res, err) {
                        console.log("success");
                        intro();
                        //nothing here, just setting new quantity above
                    })
                })
            })
    })
}

function create() {
    inquirer
        .prompt([{ //prompt for product info to be added
            type: 'input',
            name: 'productN',
            message: "what is the name of the item you are adding?"
        }, {
            type: 'input',
            name: 'department',
            message: "what is the department it belongs in?"
        }, {
            type: 'input',
            name: 'price',
            message: 'what is the price of this item?'
        }, {
            type: 'input',
            name: 'quan',
            message: 'How many are we stocking?'
        }])
        .then(answers => {
            connection.query("INSERT INTO products SET ?", { //query in new product
                product_name: answers.productN,
                department_name: answers.department,
                price: answers.price,
                stock_quantity: answers.quan
            }, function(res, err) {
                console.log("success");
                intro();
            })
        })
}
