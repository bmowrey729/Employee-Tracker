const mysql = require('mysql');
const inquirer = require('inquirer');

const ADD_DEPARTMENT = 'Add a Department';
const ADD_PERSONNEL = 'Add new Personnel';
const ADD_ROLE = 'Add a new role.';
const EXIT_TEXT = 'Exit program';
const VIEW_ROLE = 'View role table data';
const VIEW_DEPARTMENT = 'View department table data';
const VIEW_EMPLOYEE = 'View employee table data'


const connection = mysql.createConnection({
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: 'root',
    // Be sure to update with your own MySQL password!
    password: 'Lu88ockEm$',
    database: 'personnel_DB',
});

function start() {
    inquirer.prompt([
        {
            name: 'updateDatabase',
            message: 'Choose the application you would like to perform.',
            type: 'list',
            choices: [
                ADD_DEPARTMENT,
                ADD_PERSONNEL,
                ADD_ROLE,
                VIEW_ROLE,
                VIEW_DEPARTMENT,
                VIEW_EMPLOYEE,
                EXIT_TEXT
            ]
        }
    ]).then(answers => {
        const { updateDatabase } = answers;
        switch(updateDatabase) {
            case ADD_DEPARTMENT:                
                addDepartment();
                break;
            case ADD_PERSONNEL:
                // show items to user
                addPersonnel();
                break;
            case ADD_ROLE:
                // show items to user
                addRole();
                break;
            case VIEW_ROLE:
                // show items to user
                viewRole();
                break;
            case VIEW_DEPARTMENT:
                // show items to user
                viewDepartment();
                break;
            case VIEW_EMPLOYEE:
                // show items to user
                viewEmployee();
                break;
            case EXIT_TEXT:
                console.log('Thanks for providing updated information.');
                process.exit(1);
                break;
            default:
                console.log('Please select a valid option.');
                start();
                break;
        }
    });
}
function addDepartment() {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Please enter the ID number of your department.'
        },
        {
            name: 'name',
            type: 'input',
            message: 'Enter departmennt name'
        },
        
    ]).then(answers => {
        const { id, name } = answers;
        connection.query(
            'INSERT INTO department SET ?',
            {
                id,
                name
            },
            (err) => {
                if(err) throw err;
                console.log('Department created!');
                start();
            }
        );
    });
}
function addPersonnel() {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Please enter the ID number of your employee.'
        },
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter employees first name'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter employees last name'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter ID number of employees role'
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'Enter in ID number of employees manager'
        },
        
    ]).then(answers => {
        const { id, first_name, last_name, role_id, manager_id } = answers;
        connection.query(
            'INSERT INTO employee SET ?',
            {
                id,
                first_name,
                last_name,
                role_id,
                manager_id
            },
            (err) => {
                if(err) throw err;
                console.log('Employee created!');
                start();
            }
        );
    });
}
function addRole() {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Please enter the ID number of the role.'
        },
        {
            name: 'title',
            type: 'input',
            message: 'Enter the title of this role'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter salary for this role'
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'Enter ID number of department role belongs to'
        },
                
    ]).then(answers => {
        const { id, title, salary, department_id } = answers;
        connection.query(
            'INSERT INTO role SET ?',
            {
                id,
                title,
                salary,
                department_id
            },
            (err) => {
                if(err) throw err;
                console.log('Role created!');
                start();
            }
        );
    });
     
}

function viewRole(){
connection.query("SELECT * FROM role", function (err, result) {
         if (err) throw err;
         console.table(result);
         start();
});
}
function viewDepartment(){
    connection.query("SELECT * FROM department", function (err, result) {
             if (err) throw err;
             console.table(result);
             start();
    });
}
function viewEmployee(){
    connection.query("SELECT * FROM employee", function (err, result) {
             if (err) throw err;
             console.table(result);
             start();
    });
}


connection.connect((err) => {
    if(err) throw err;
    
    start();
});

