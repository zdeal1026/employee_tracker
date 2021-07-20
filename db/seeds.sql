DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id VARCHAR(30),
    manager_id INT
);

INSERT INTO department(department_name)
VALUES 
        ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
        ('Sales Lead', '100000', 1),
        ('Salesperson', '65000', 1),
        ('Lead Engineer', '150000', 2),
        ('Software Engineer', '12000', 2),
        ('Accountant', '125000', 3),
        ('Legal Team Lead', '250000', 4),
        ('Lawyer', '190000', 4);
        

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
        ('Robert', 'Smith', 34, 4),
        ('James', 'Spader', 56, null),
        ('Kevin', 'Conroy', 23, 3),
        ('Bruce', 'Wayne', 83, null ),
        ('Val', 'Kilmer', 44, 2),
        ('Michael', 'Keaton', 68, 1 ),
        ('Ben', 'Affleck', 47, null );

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employees;

SELECT title, first_name, last_name, department_name
FROM department
INNER JOIN role ON role.department_id = department.id 
INNER JOIN employees ON employees.role_id = role.id 
WHERE ?

