const fs = require('fs');
const path = require('path');
const getDirName = __dirname;
const secretFolder = 'secret-folder';
const getpathJoint = path.join(getDirName, secretFolder);




fs.readdir(getpathJoint, {withFileTypes: true}, (err, files) => {
    if(err)    {
        throw err;
    }

    files.map(file => {        
        if(file.isFile()) {
            const newFile = path.join(getDirName, secretFolder, file.name);
            getSize(newFile);
        }
    });


});

function getSize(newFile) {
    let stat = fs.promises.stat(newFile);
    stat.then((file) => console.log(path.parse(newFile).name +' - '+ path.extname(newFile).substring(1) +' - '+ file.size));    
    
}

