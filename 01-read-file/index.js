const fs = require('fs');
const path = require('path');
const getDirName = __dirname;
const fileName = 'text' + '.txt';
const getpathJoint = path.join(getDirName, fileName);
const encode = 'utf-8';
const readStream = fs.createReadStream(getpathJoint, encode);
readStream.on('data', chunk => {console.log(`${chunk}`)});
