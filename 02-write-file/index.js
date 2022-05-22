const fs = require('fs');
const path = require('path');
const getDirName = __dirname;
const fileName = 'text' + '.txt';
const getpathJoint = path.join(getDirName, fileName);
const encode = 'utf-8';
const writeStream = fs.createWriteStream(getpathJoint, encode);

const stdout = process.stdout;
const stdin = process.stdin;

stdout.write('Pls enter some text:' + '\n');

stdin.on('data', dataStream => {    
    if(dataStream.toString().trim() == 'exit')
    {   
        stdout.write('File is created!' + '\n');
        stdout.write('Exit Success is indicated by exit text statement which means successful termination of the program.' + '\n');
        process.exit();
    }

    writeStream.write(dataStream.toString());    
  });


process.on('SIGINT', () => {
    stdout.write('File is created!' + '\n');
    stdout.write('Exit is indicated by command "ctrl + c". ' + '\n');
    process.exit();
});


