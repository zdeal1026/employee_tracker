DROP DATABASE IF EXISTS tracker_DB;
CREATE DATABASE tracker_DB;

USE tracker_DB;

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

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30);
    last_name VARCHAR(30);
    role_id VARCHAR(30);
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
        ('')

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
        ('')

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employees;

SELECT title, first_name, last_name, department_name
FROM department
INNER JOIN role ON role.department_id = department.id 
INNER JOIN employees ON employees.role_id = role.id 
WHERE ?`,

