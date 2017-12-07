var mysql = require("mysql");

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
    //console.log("connected as id " + connection.threadId + "\n");
    //ProductInfo();
});

var productInfoRaw = connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    connection.end();
});
var productInfo = productInfoRaw._results;
//console.log(productInfo);

module.exports = productInfo;
