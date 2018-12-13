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
    inquirer.prompt([
        {
            type: 'list',
            name: 'managerOption',
            message: 'Which of the following would you actions would you like to perfom?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ]).then(function(mngr) {

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

            case ('Add to Inventory'):
            addInventory();
            break;
        }
    });
});