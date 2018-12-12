var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

var conn = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'password',
    database: 'bamazon_DB'
});

conn.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + conn.threadId);
});