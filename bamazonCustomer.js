var mysql = require("mysql");
var inquirer = require("inquirer");
require('es7-object-polyfill');
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
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var idArray = [];
        for (var i = 0; i < res.length; i++) {
            console.log("id: " + res[i].id + "  product: " + res[i].product_name + "  price: $" + res[i].price + "  quantity left: " + res[i].stock_quantity)
            idArray.push(res[i].id.toString());
            //quantityArray.push(res[i].stock_quantity);
            //instead, create an object with id and quantity
        }
        //console.log(obj)
        console.log('\n');

        buyItem(idArray, res);

    });
}

function buyItem(idArray, res) {
    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: 'What would you like to buy?',
            choices: idArray
        }, {
            type: "input",
            name: "chosenQuantity",
            message: "how many would you like to buy"
        }])
        .then(answers => {
            if (res[(answers.choice - 1)].stock_quantity < answers.chosenQuantity) {
                console.log("We dont have that many, please place a different order");
                displayProducts();
            }
            else {
                var remainQuant = res[(answers.choice - 1)].stock_quantity - answers.chosenQuantity;
                var totalCost = answers.chosenQuantity * res[(answers.choice - 1)].price;
                var totalProductSales = totalCost + res[(answers.choice - 1)].product_sales;
                console.log(totalCost + "\n");
                order(answers.choice, remainQuant, totalProductSales);
            }
        });
}

function order(item, rQuan, addCost) {
    item = parseInt(item);
    /*UPDATE `products`
    SET stock_quantity = 145
    WHERE id = 5*/
    var query = connection.query(
        "UPDATE products SET ? WHERE ?", [{
                stock_quantity: rQuan,
                product_sales: addCost
            },
            {
                id: item
            }
        ],
        function(err, res) {
            console.log("success \n");
            displayProducts();


        }
    );

}
