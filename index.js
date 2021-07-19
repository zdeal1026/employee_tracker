const inquirer = require("inquirer");
const mysql= require("mysql");
const console = require("console.table");

//gets connection to database and portion
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3434;
    user: 'root',
    password: '',
    database: 'tracker_DB',
});

