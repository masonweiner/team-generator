const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

const inquirer = require("inquirer");
const fs = require("fs");
const { formatWithOptions } = require("util");

let isManager = true;
let isEngineer = false;
let isIntern = false;

let employees = [];

function askQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Manager name:",
        name: "name",
        when: isManager,
      },
      {
        type: "input",
        message: "Engineer name:",
        name: "name",
        when: isEngineer,
      },
      {
        type: "input",
        message: "Engineer Github user name:",
        name: "github",
        when: isEngineer,
      },
      {
        type: "input",
        message: "Intern name:",
        name: "name",
        when: isIntern,
      },
      {
        type: "input",
        message: "Intern school name:",
        name: "school",
        when: isIntern,
      },
      {
        type: "input",
        message: "Employee id:",
        name: "id",
      },
      {
        type: "input",
        message: "Employee email address:",
        name: "email",
      },
      {
        type: "input",
        message: "Employee office number:",
        name: "officeNumber",
        when: isManager,
      },
      {
        type: "confirm",
        message: "Would you like to add more employees?",
        name: "newEmployee",
      },
    ])
    .then((response) => {
      manageResponses(response);
    });
}

function buildEngineer(response) {
  const engineer = new Engineer(
    response.name,
    response.id,
    response.email,
    response.github
  );
  employees.push(engineer);
}
function buildIntern(response) {
  const intern = new Intern(
    response.name,
    response.id,
    response.email,
    response.school
  );
  employees.push(intern);
}

function buildManager(response) {
  const manager = new Manager(
    response.name,
    response.id,
    response.email,
    response.officeNumber
  );
  employees.push(manager);
}

function manageResponses(response) {
  if (isManager) {
    buildManager(response);
  } else if (isEngineer) {
    buildEngineer(response);
  } else {
    buildIntern(response);
  }

  if (response.newEmployee) {
    inquirer
      .prompt([
        {
          type: "checkbox",
          message: "What type of employee would like to add next:",
          choices: ["Engineer", "Intern", "None"],
          name: "empType",
        },
      ])
      .then((answer) => {
        console.log(answer.empType[0]);

        switch (answer.empType[0]) {
          case "Engineer":
            isEngineer = true;
            isManager = false;
            isIntern = false;
            console.log("buildEngineer");
            askQuestions();
            break;
          case "Intern":
            isEngineer = false;
            isManager = false;
            isIntern = true;
            console.log("buildIntern");
            askQuestions();
            break;
          default:
            console.log(employees);
            console.log("program end");
            generateHTML();
        }
      });
  } else {
    console.log(employees);
    console.log("generating html");
    generateHTML();
  }
}

function generateHTML() {
  let card = "";
  for (let i = 0; i < employees.length; i++) {
    console.log(employees[i].getRole());
    if (employees[i].getRole() === "Manager") {
      card += `
      <div class="card mb-4 ">
          <div class="card-header py-1">
            <h4 class="my-0 fw-normal">${employees[i].name}</h4>
            <h4 class="my-0 fw-normal"> ${employees[i].getRole()}</h4>
          </div>
          <div class="card-body">
            <p class="card-content id">ID: ${employees[i].id}</p>
            <p>Email:<a class="card-content email" href = "mailto: ${
              employees[i].email
            }">
         ${employees[i].email}
            </a></p>
            <p class="card-content office-number">Office number: ${
              employees[i].officeNumber
            }</p>
          </div>
        </div>`;
    } else if (employees[i].getRole() === "Intern") {
      card += `
      <div class="card mb-4">
          <div class="card-header py-1">
            <h4 class="my-0 fw-normal">${employees[i].name}</h4>
            <h4 class="my-0 fw-normal">${employees[i].getRole()}</h4>
          </div>
          <div class="card-body">
            <p class="card-content id">ID: ${employees[i].id}</p>
            <p>Email:<a class="card-content email" href = "mailto: ${
              employees[i].email
            }">
         ${employees[i].email}
            </a></p>            
            <p class="card-content school">School ${employees[i].school}</p>
          </div>
        </div>`;
    } else if (employees[i].getRole() === "Engineer") {
      card += `
      <div class="card mb-4">
          <div class="card-header py-1">
            <h4 class="my-0 fw-normal">${employees[i].name}</h4>
            <h4 class="my-0 fw-normal">${employees[i].getRole()}</h4>
          </div>
          <div class="card-body">
            <p class="card-content id">ID: ${employees[i].id}</p>
            <p>Email:<a class="card-content email" href = "mailto: ${
              employees[i].email
            }">
         ${employees[i].email}
            </a></p>
            <p>Email:<a class="card-content github" href = "https://github.com/${
              employees[i].github
            }">
         ${employees[i].github}
            </a></p>
          </div>
        </div>`;
    }
  }

  let html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
      crossorigin="anonymous"
    />
    <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    rel="stylesheet"/>    
    <link rel="stylesheet" href="./style.css" />
    <title>Team Profile Generator</title>
  </head>

  <header>
    <h1 class="display-5 fw-bold text-center">My Team</h1>
  </header>

  <body>
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        ${card}
    </div>
  </body>
</html>`;

  let css = `
  header {
    padding: 20px;
    background-color: #3B2C35;
    color: #59C9A5;
  }
  
  .row {
    justify-content: center;
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    width: 750px;
    margin: 0 auto;
  }
  
  .card-header {
    background-color: #3B2C35;
    color: #59C9A5;
    text-align: left;
  }
  
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  
    text-align: left;
  }
  
  .card {
    width: 400px;
    margin: 30px;
    padding: 0;
  }
  
  `;

  fs.mkdir("./dist/", { recursive: true }, (err) =>
    err ? console.log(err) : console.log("directory created succesfully")
  );

  fs.writeFile("./dist/style.css", css, (err) =>
    err ? console.log(err) : console.log("HTML file created succesfully")
  );

  fs.writeFile("./dist/index.html", html, (err) =>
    err ? console.log(err) : console.log("HTML file created succesfully")
  );
}

askQuestions();
