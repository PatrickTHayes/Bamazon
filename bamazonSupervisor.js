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
    console.log("connected as id " + connection.threadId + "\n");
    intro();
});

function intro() {
    inquirer
        .prompt([{ //get user input on what to do
            type: 'list',
            name: 'theme',
            message: 'What do you want to do now?',
            choices: [
                'View Product Sales by Department',
                'Create New Department'
            ]
        }, ])
        .then(answers => {
            switch (answers.theme) { //logic on what function should be run based on user input
                case 'View Product Sales by Department':
                    // code
                    viewDep();
                    break;
                case 'Create New Department':
                    // code
                    createDep();
                    break;

                default:
                    // code
            }
        });
}

function viewDep() {
    connection.query("SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales) AS total_sales, SUM(product_sales-over_head_costs) AS total_profits FROM products INNER JOIN departments ON products.department_name=departments.department_name GROUP BY department_name ORDER BY total_profits DESC", function(err, res) { // get department choices from both tables
        var table = new Table({ //create table through the cli-table
            head: ['department id', 'department name', 'Over Head Costs', 'total sales', 'total profit'],
            colWidths: [30, 30, 30, 30, 30],
            style: { compact: true, 'padding-left': 1 }
        });
        for (var i = 0; i < res.length; i++) { //input data into the cli table
            table.push(
                [res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].total_sales, res[i].total_profits], []
            )
        }
        //console.log(table);
        console.log(table.toString());
        //console.log(res);
    })
}

function createDep() {
    console.log('running create');
}
