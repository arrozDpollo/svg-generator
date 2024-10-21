const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo text:',
      validate: (input) => input.length <= 3 || 'Text must be up to 3 characters long.',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hex):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape for the logo:',
      choices: ['Triangle', 'Circle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hex):',
    },
  ])
  .then(({ text, textColor, shape, shapeColor }) => {
    let shapeObj;
    switch (shape) {
      case 'Triangle':
        shapeObj = new Triangle();
        break;
      case 'Circle':
        shapeObj = new Circle();
        break;
      case 'Square':
        shapeObj = new Square();
        break;
    }
    shapeObj.setColor(shapeColor);

    const svg = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shapeObj.render()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>
    `;
    
    fs.writeFileSync('logo.svg', svg);
    console.log('Generated logo.svg');
  });
