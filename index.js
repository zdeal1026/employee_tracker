const inquirer = require("inquirer");
const mysql = require("mysql");
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
const employees = () => {
    console.log('Showing Employee Data');
    connection.query(
        `SELECT employees.first_name , employees.last_name, title, salary, managers.first_name AS manager_name
        FROM employees
        LEFT JOIN employees managers ON employees.manager_id = managers.id
        INNER JOIN role ON employees.role_id = role.id`,

        (err, results) => {
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
            if (err) throw err; console.table(results);
            init();
        }
    );
};

//showing all deparments
const showDeparments = () => {
    console.log('Showing deparments');
    connection.query(
        `SELECT deparment_name, title, salary
        FROM department
        INNER JOIN role ON role.deparment_id = deparment.id`,

        (err, results) => {
            if (err) throw err; console.table(results);
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

//shoiwing employee by roles
const employeeRoles = () => {
    connection.query(
        "SELECT * FROM role",

        (err, results) => {
            if (err) throw err;

            const roles = results.map((role) => {
    return role.title;
});

inquirer
    .prompt({
        name: "role",
        type: "list",
        message: "Select which role you would like to view.",
        choices: roles,
    })
    .then((answer) => {
        console.log("Viewing employees by role");
        connection.query(
            `
        SELECT title, first_name, last_name 
        FROM role 
        INNER JOIN employees ON employees.role_id = role.id
        WHERE ?`,
            {
                title: answer.role,
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

    //adding employee
    const addEmployee = () => {
        connection.query(
            `SELECT * FROM employees`,
            
            (err, employResults) => {
                if (err) throw err;

                const employees = employResults.map((employee) => {
                    return {
                        name: employee.first_name + " " + employee.last_name, 
                        value: employee.id,
                    };
                });
                employees.push({ name: "No Manager", value: null});

                connection.query(
                    `SELECT * FROM role`,

                    (err,results) => {
                        if (err) throw err;
                        
                        const roles = results.map((role) => {
                            return {name: role.title, value: role.id };
                        });

                        inquirer
                        .prompt([
                            {
                                name: "first_name",
                                type: "input",
                                mesage: "Please enter employee's first name.",
                            },
                            {
                                name: "last_name",
                                type: "input",
                                mesage: "Please enter employee's last name.",
                            },
                            {
                                name: "role_id",
                                type: "list",
                                message: "Please enter role ID number.",
                                choices: roles,
                            },
                            {
                                name: "manager_id",
                                type: "list",
                                message: "Please enter manager name",
                                choices: employees,
                            },
                        ])
                        .then((answer) => {
                            connection.query(
                                `INSERT INTO employees SET ?`,
                                {
                                    first_name: answer.first_name,
                                    last_name: answer.last_name,
                                    role_id: answer.role_id,
                                    manager_id: answer.manager_id,
                                },
                                (err, res) => {
                                    if (err) throw err;
                                    console.log("Employee Added");
                                    init();
                                }
                            );
                        });
                    }
                );
            });
    }

    //adding role
    const addRole = () => {
        connection.query(
            `SELECT * FROM department`,

            (err, results) => {
                if (err) throw err;

                const departments = results.map((department) => {
                    return {name: department.department_name, value:deparment.id};
                });

                inquirer
                .prompt([
                    {
                        name: "title",
                        type: "input",
                        message: "Please enter new role",
                    },
                    {
                        name:"salary",
                        type: "number",
                        message: "Please enter the salary number",
                    },
                    {
                        name: "department_id",
                        type: "list",
                        message: "Please enter employee department",
                        choices: departments,
                    },
                ])
                .then((answer) => {
                    connectin.query(
                        `INSERT INTO role SET ?`,
                        {
                            title: answer.title, 
                            salary: answer.salary,
                            department_id: answer.department_id,
                        },
                        (err,res) => {
                            if (err) throw err; 
                            console.log("Role Added");
                            init();
                        }
                    );
                });
            }
        );
    };

    //remove an employee
    const removeEmployee = () => {
        connection.query(
            `SELECT * FROM emplyees`,
            (err, employeeResults) => {
                if (err) throw err;

                const employees = employeeResults.map((employee) => {
                    return {
                        name: employee.first_name + " " + emplyee.last_name,
                        value: employee.id,
                    };
                });
                inquirer
                .prompt([
                    {
                        name: "employee",
                        type: "list",
                        message: "Please choose and employee to remove",
                        choices: employees,
                    },
                ])
                .then((answer) => {
                    connection.query(
                        `DELETE FROM employees WHERE ?`,
                        {
                            id: answer.employee,
                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log("Employee removed");
                            init();
                        }
                    );
                });
            });
    };

    //adding department 
    const departmentAdd = () => {
        inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "Please enter new department",
            },
        ])
        .then((answer) => {
            connection.query(
                `INSERT INTO department SET ?`,
                {
                    department_name: answer.department,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log("Department added");
                    init();
                }
            );
        });
    };


//employee update 
const update = () => {
    connection.query(
        `SELECT * FORM employees`, (err, employeeResults) => {
            if (err) throw err;

            const employees = employeeResults.map((employee) => {
                return {
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id,
                };
            });
            connection.query(
                `SELECT * FROM role`,

                (err, results) => {
                    if (err) throw err;

                    const roles = results.map((role) => {
                        return { name:role.title, value: role.id};
                    });

                    inquirer.
                    prompt([
                        {
                            name: "update",
                            type: "list",
                            message: "Please choose employee to update",
                            choices: employees,
                        },
                        {
                            name: "role",
                            type: "list",
                            message: "Please choose new role",
                            choices: roles,
                        },
                    ])
                    .then((answer) => {
                        connection.query(
                            `UPDATE employee SET ? WHERE ?`,
                            [
                                {
                                    role_id: answer.role,
                                },
                                {
                                    id: answer.update,
                                },
                            ],
                            (err, res) => {
                                if (err) throw err;
                                console.log("Employee updated");
                                init();
                            }
                        );
                    });
                }
            );
        });
};

//startin the app
const init = () => {
    inquirer.
    prompt({
        name: 'response',
        type: 'list',
        message: 'What do you want to do?',
        choices: [
            "Show Employees",
            "Show Roles",
            "Show Deparments",
            "Show Employees by Deparments",
            "Show Employees by Roles",
            "Add Employee",
            "Remove Employee",
            "Update Employee",
            "Add Department",
            "Add Role",
            "Exit",
        ],
    })
    .then((answer) => {
        switch (answer.response) {
            case "Show Employees":
            employees();
            break;

            case "Show Roles":
            showRoles();
            break;

            case "Show Departments":
            showDeparments();
            break;

            case "Show Employees by Deparments":
            employeeDep();
            break;

            
            
            
            
            
        }
    })
}
