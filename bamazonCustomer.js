// Packages required for this app
var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

// Connection variable with all the requisite settings
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon_DB'
});

// Initial connection to the database that will log a connection ID for verification and then call the forSale function to start the functionality
conn.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + conn.threadId);
    forSale();
});

// For sale function query's the database for all available product IDs, names and prices and displays them in a table, it then calls the purchase function
function forSale() {
    conn.query('SELECT item_id, product_name, price FROM products', function (err, res) {
        if (err) throw err;
        console.table(res);
        purchase();
    });
}

// The purchase function prompts the user via inquirer for their chosen product_id and quantity to purchase 
function purchase() {
    conn.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
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
            } //if their is not enough in stock to fulfill the order, the user is prompted as such and the order is not place.          
        ]).then(function (answ) {
            if (answ.qty > res[answ.item_id - 1].stock_quantity) {
                console.log('\nInsufficient quantity. Only ' + (res[answ.item_id - 1].stock_quantity) + ' remain in stock.\n');
                conn.end();
            } else { // If there is enough on hand, the database is queried to remove the product/quantity 
                conn.query('UPDATE PRODUCTS SET ? WHERE ?',
                    [{
                        stock_quantity: ((res[answ.item_id - 1].stock_quantity) - answ.qty)
                    },
                    {
                        item_id: answ.item_id
                    }
                    ], function (err, res) {
                        if (err) throw err;
// The total function is then called and passed the quantity and product_id
                        total(answ.qty, answ.item_id);
                    }
                );
            }
         
        })
    });
}

// The total of the purchse is calculated and displayed.
function total(qty, id) {
    conn.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('\nPurchase completed.\nYour total purchse price: $' + (qty * (res[id - 1].price)).toFixed(2) + '\n');
        conn.end();
    });
}