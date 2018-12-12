var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon_DB'
});

conn.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + conn.threadId);
    forSale();
});

function forSale() {
    conn.query('SELECT item_id, product_name, price FROM products', function (err, res) {
        if (err) throw err;
        console.table(res);
        purchase(res);
    });
}

function purchase(res) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'What is the item_id of the product you\'d like to purchase?'
        },
        {
            type: 'input',
            name: 'qty',
            message: 'How many units would you like to purchase?'
        }
    ]).then(function (answ) {
        // if (answ.qty > res[answ.item_id - 1].stock_quantity)
        console.log('ID: ' + res[0].item_id);
        console.log('Name: ' + res[0].product_name);
        console.log('Price: ' + res[0].price);
        console.log('Stock: ' + res[0].stock_quantity);
        console.log('ID: ' + answ.item_id);
        console.log('QTY: ' + answ.qty);
        conn.end();
    })
}