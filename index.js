const inquirer = require("inquirer");
const mysql= require("mysql");
const console = require("console.table");

//gets connection to database and portion
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3434,
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

//showing all roles
const showRoles = () => {
    console.log('Showing roles');
    connection.query(
        `SELECT title, salary, department_name
        FROM role
        INNER JOIN deparment ON role.department_id = deparment.id`,

        (err, results) => {
            if (err) throw err;console.table(results);
            init();
        }
    );
};

//showing all deparments
const showDeparments = ()=> {
    console.log('Showing deparments');
    connection.query(
        `SELECT deparment_name, title, salary
        FROM department
        INNER JOIN role ON role.deparment_id = deparment.id`,

        (err, results) => {
            if (err) throw err;console.table(results);
            init();
        }
    )
}

//showing employee deparments
const employeeDep = () => {
    connection.query(
        "SELECT * FROM department",

        (err, results) => {
            if (err) throw err;

        const departments = results.map((department) => {
            return department.department_name;
        });

        inquirer
            .prompt({
                name: 'department',
                type: 'list',
                message: 'Which deparment would you like to show?',
                choices: departments
            })
            .then((answer) => {
                console.log('Showing Employees by Deparment');
                connection.query(
                    `SELECT title, first_name, last_name, department_name 
                    FROM department 
                    INNER JOIN role ON role.department_id = deparment.id 
                    INNER JOIN employees ON employees.role_id = role.id 
                    WHERE ?`,
                    {
                        department_name: answer.department,
                    },

                    (err, results) => {
                        if (err) throw err;
                        console.table(results);
                        init();
                    }
                );
            });
        }
    );
};



