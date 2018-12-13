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
    start();
});

function start() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'Which of the following actions would you like to perfom?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ]).then(function (mngr) {
        switch (mngr.choices) {
            case ('View Products for Sale'):
                // console.log('forSale');
                forSale();
                break;

            case ('View Low Inventory'):
                // console.log('lowInventory');
                lowInventory();
                break;

            case ('Add to Inventory'):
                // console.log('addInventory');
                addInventory();
                break;

            case ('Add New Product'):
                // console.log('addInventory');
                addNewProduct();
                break;

            default:
                console.log('connection terminated.');
                conn.end();
        }
    });
}


function forSale() {
    conn.query('SELECT* FROM products', function (err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        conn.end();
    });
}

function lowInventory() {
    conn.query('SELECT * FROM products WHERE stock_quantity < 50', function (err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        if (res === ' ') {
            console.log('No products at low inventory levels.');
        }
        conn.end();
    });
}


function addInventory() {
    conn.query('SELECT* FROM products', function (err, res) {
        if (err) throw err;
        console.table(res);

        inquirer.prompt([
            {
                type: 'input',
                name: 'item_id',
                message: 'What is the item_id of the product you\'d like to stock?'
            },
            {
                type: 'input',
                name: 'qty',
                message: 'How many units would you like to purchase?'
            }
        ]).then(function (answ) {
            conn.query('UPDATE products SET ? WHERE ?',
                [{
                    stock_quantity: (parseInt((res[answ.item_id - 1].stock_quantity))) + (parseInt(answ.qty))
                },
                {
                    item_id: answ.item_id
                }
                ], function (err, res) {
                    if (err) throw err;
                    console.log('Inventory Added.');
                    forSale();
                }
            );
        })
    });
}


function addNewProduct() {
    conn.query('SELECT* FROM products', function (err, res) {
        if (err) throw err;
        console.table(res);

        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the product you\'d like to add?'
            },
            {
                type: 'input',
                name: 'dept',
                message: 'What department name would you like it to be listed under?'
            },
            {
                type: 'input',
                name: 'price',
                message: 'What would you like to set the list price as?'
            },
            {
                type: 'input',
                name: 'qty',
                message: 'How many units would you like to stock?'
            }

        ]).then(function (answ) {
            conn.query('INSERT INTO products SET ?',
                [{
                    product_name: answ.name,
                    department_name: answ.dept,
                    price: answ.price,
                    stock_quantity: answ.qty
                }
                ], function (err, res) {
                    if (err) throw err;
                    console.log('New Item Added.');
                    forSale();
                }
            );
        })
    });
}
