// TODO: Include packages needed for this application
const { profile } = require('console');
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./generateMarkdown');


// TODO: Create an array of questions for user input
const promptUser = ()=>{
return inquirer.prompt([
    {
     type: 'input',
     name: 'title',
     message: 'What would you like to name your Readme???',
     validate: titleInput => {
        if (titleInput) {
          return true;
        } else {
          console.log("Title please!");
          return false;
        }
      }
    },
    {
        type: 'input',
        name: 'description',
        message: 'How would you describe your project????',
        validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log("Description please!");
              return false;
            }
          }
        
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please provide installation instructions',
        validate: installationInput => {
            if (installationInput) {
              return true;
            } else {
              console.log("Instructions please!");
              return false;
            }
          }
        
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How do you use it?',
        validate: usageInput => {
            if (usageInput) {
              return true;
            } else {
              console.log("don't leave");
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Please provide contribution instructions',
        validate: contributionInput => {
            if (contributionInput) {
              return true;
            } else {
              console.log("don't leave");
              return false;
            }
        }
        
    },
    {
        type: 'input',
        name: 'test',
        message: 'How do you test your app?',
        validate: testInput => {
            if (testInput) {
              return true;
            } else {
              console.log("don't leave");
              return false;
            }
        }
        
    },
    {
        type: 'confirm',
        name: 'license',
        message: 'Do you have any fancy licenses?',
        default: false,
       },
    
]).then(answers => {
    if (answers.license){
        licensePrompt(answers)
    }
    else{
        answers.badges = [];
        return writeToFile(answers);
    }
})

};



   const licensePrompt = userInfo =>{
    //    console.log(userInfo);
   if(!userInfo.badges){
       //this empty array allows the license renderers to return empty strings
    userInfo.badges = [];}
   
       return inquirer.prompt([
           
           {
               type: 'input',
               name: 'badge',
               message:'What is the name of your license?',
               validate: badgeInput => {
                if (badgeInput) {
                  return true;
                } else {
                  console.log("Don't leave it blank!");
                  return false;
                }
              }
           },
           {
            type: 'input',
            name: 'about',
            message: "Describe it in one word",
            validate: aboutInput => {
                if (aboutInput) {
                  return true;
                } else {
                  console.log("Don't leave it blank!");
                  return false;
                }
              }

        },
        {
            type: 'list',
            name: 'color',
            message: 'what color would you like?',
            choices: ['brightgreen', 'green', 'yellow', 'orange']
        },
           {
               type: 'input',
               name: 'link',
               message: "what the link?",
               validate: linkInput => {
                if (linkInput) {
                  return true;
                } else {
                  console.log('You need to enter a project link!');
                  return false;
                }
              }
           },
         
           {
            type: 'confirm',
            name: 'another',
            message: 'Do you have another?',
            default: false,
           }

       ]).then(answers => {
           userInfo.badges.push(answers);
           if(answers.another){
               return licensePrompt(userInfo)
           }
           else{
               
               return writeToFile(userInfo);
           }

    })
    
};

     
// TODO: Create a function to write README file
const writeToFile = (info => {
   
    const newWords = generateMarkdown(info);

    fs.writeFile('readme.md', newWords, err =>{
    if (err) throw new Error(err);
   console.log('Title updated. Now fill out the rest');
   
 });

});









  

  

// TODO: Create a function to initialize app
function init() {
   return inquirer.prompt([
       {
           type: 'confirm',
           name: 'start',
           message: 'Do you want to make a sick readme?',
           default: false,
          
       }
   ]).then(start => {
    if (start.start) {
        
      return promptUser()
      
      
    } else {
        console.log("Ok, sorry")
        return;
      
    }
  });
};

// Function call to initialize app
init();



