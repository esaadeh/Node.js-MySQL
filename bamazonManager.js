// Packages required for the app
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
// Initial connection to the database that will log a connection ID for verification and then call the start function to start the functionality
conn.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + conn.threadId);
    start();
});

// The start function prompts the user via inquirer for their chosen action and then calls the requisite function
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
                forSale();
                break;

            case ('View Low Inventory'):
                lowInventory();
                break;

            case ('Add to Inventory'):
                addInventory();
                break;

            case ('Add New Product'):
                addNewProduct();
                break;

            default:
                console.log('connection terminated.');
                conn.end();
        }
    });
}

// Querys the database and diplays all products for sale and all column data on them
function forSale() {
    conn.query('SELECT* FROM products', function (err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        conn.end();
    });
}

// Querys the db and diplays all product data on item with less then 5 units in stock. If none, will log such
function lowInventory() {
    conn.query('SELECT * FROM products WHERE stock_quantity < 5', function (err, res) {
        if (err) throw err;

        if (!res.length) {
            console.log('\nNo products at low inventory levels.\n');
            conn.end();
        } else { 
        console.log('\n');
        console.table(res);
        conn.end();
        }
    });
}

// Querys the db and returns all items in stock and then prompts the user via inquirer what item they'd like to stock and how many.
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
            } // The two data points from above are used to update the db and forSale is called to show all items again
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

// The user is prompted via inquirer fot the name, department, price and quantity of the new item they'd like to stock and .then the database is updated as such
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
