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

//viewing employees
const employee = () => {
    console.log('Showing Employee Data');
    connection.query(
        `SELECT employee.first_name , employeee.last_name, title, salary, managers.first_name AS manager_name
        FROM employee
        LEFT JOIN employee managers ON employee.manager_id = managers.id
        INNER JOIN role ON employee.role_id = role.id`,

        (err,results) => {
            if (err) throw err;
            console.table(results);
            init();
        }
    );
};

