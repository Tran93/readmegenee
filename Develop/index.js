// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
{
       type: 'input',
       name: 'title',
       message: 'Give me your project name',
       validate: titleInput => {
        if (titleInput) {
            return true;
        } else {
            console.log('Please enter your project name!');
            return false;
        }
    }
},

{
    type: 'input',
    name: 'description',
    message: 'Provide a brief description of your  project.',
    validate: descriptionInput => {
        if (descriptionInput) {
            return true;
        } else {
            console.log('Please describe your project!');
            return false;
        }
    }
},

{
    type: 'input',
    name: 'installation',
    message: 'what are the installation instructions for your project',
    validate: installInput => {
        if (installInput) {
            return true;
        } else {
            console.log ('Please type your installation instructions!');
        }
    }
},

{
    type: 'input',
    name: 'usage',
    message:'Please provide instructions to use your application',
    validate: usageInput => {
        if (usageInput) {
             return true;
        } else {
            console.log ('Please enter your use instructions!');
        }
    }
},

{
    type: 'list',
    name: 'license',
    message: 'Which license will you use for your project?',
    choices: ['apache', 'gnu','mit', 'none']
},

{
    type: 'input',
    name: 'tests',
    message: 'Please provide instructions on how to test this project',
    validate: testInput => {
        if (testInput) {
            return true;
        } else {
            console.log('Please enter your use test instructions!');
            return false;
        }
    }
},

{
    type: 'confirm',
    name: 'Contributers',
    message: 'Would you like to allow other developers to contribute?',
    default: true
},

];

// TODO: Create a function to write README file
//function writeToFile(fileName, data) {}

const writeFile = fileInfo => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/my-README.md', fileInfo, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File was created!'
            });
        });
    });
};

// TODO: Create a function to initialize app
    const init = () => {

        return inquirer.prompt(questions)
        .then(readmeData => {
            return readmeData;
        })
    }

// Function call to initialize app
//init();

init()
.then(readmeInfo => {
    console.log(readmeInfo);
    return generateMarkdown(readmeInfo);
})
.then(pageMD => {
    return writeFile(pageMD);
})
.then(writeFileResponse => {
    console.log(writeFileResponse.message);
})
.catch(err => {
    console.log(err);
})