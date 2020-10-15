const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
var teamList = [];
const managerQuestions = [{
        type: "input",
        name: "name",
        message: "What is your project manager's name?",
        validate: async (input) => {
            if (input == "" || /\s/.test(input)) {
                return "Invalid input";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is your project manager's email?",
        validate: async (input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Invalid input";
        }
    },
    {
        type: "input",
        name: "officeNum",
        message: "What is your project manager's office number?",
        validate: async (input) => {
            if (isNaN(input)) {
                return "Invalid input";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "addAnother",
        message: "Would you like to add another team member?",
        choices: ["Yes", "No"]
    }
]

const employeeQuestions = [{
        type: "input",
        name: "name",
        message: "What is this team member's name?",
        validate: async (input) => {
            if (input == "") {
                return "Invalid input";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is this team member's name?",
        validate: async (input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Invalid input";
        }
    },
    {
        type: "list",
        name: "role",
        message: "What is this team member's role?",
        choices: ["engineer", "intern"]
    },
    {
        when: input => {
            return input.role == "engineer"
        },
        type: "input",
        name: "github",
        message: "What is this team member's Github username?",
        validate: async (input) => {
            if (input == "" || /\s/.test(input)) {
                return "Invalid input";
            }
            return true;
        }
    },
    {
        when: input => {
            return input.role == "intern"
        },
        type: "input",
        name: "school",
        message: "What school does this team member attend?",
        validate: async (input) => {
            if (input == "") {
                return "Invalid input";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "addAnother",
        message: "Would you like to add another team member?",
        choices: ["Yes", "No"]
    }
]