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
        purchase();
    });
}

function purchase() {
    conn.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.table(res);
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
            if (answ.qty > res[answ.item_id - 1].stock_quantity) {
                console.log('\nInsufficient quantity. Only ' + (res[answ.item_id - 1].stock_quantity) + ' remain in stock.\n');
                conn.end();
            } else {
                conn.query('UPDATE PRODUCTS SET ? WHERE ?',
                    [{
                        stock_quantity: ((res[answ.item_id - 1].stock_quantity) - answ.qty)
                    },
                    {
                        item_id: answ.item_id
                    }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log(res);
                        // console.log('Purchase completed.\n Your total purchse price: $' + (answ.qty * (res[answ.item_id - 1].price)));
                        total(answ.qty, answ.item_id);
                    }
                );
            }
            // console.log(res[answ.item_id - 1].stock_quantity);
            // console.log('ID: ' + res[0].item_id);
            // console.log('Name: ' + res[0].product_name);
            // console.log('Price: ' + res[0].price);
            // console.log('Stock: ' + res[0].stock_quantity);
            // console.log('ID: ' + answ.item_id);
            // console.log('QTY: ' + answ.qty);
        })
    });
}  // End of purchase function

function total(qty, id) {
    conn.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log('\nPurchase completed.\nYour total purchse price: $' + (qty * (res[id - 1].price)).toFixed(2) + '\n');
        conn.end();
    });
}