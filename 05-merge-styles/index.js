const fs = require('fs');
const path = require('path');
const getDirName = __dirname;
const fromFolderName = 'styles';
const toFolderName = 'project-dist';
const newFolder = path.join(getDirName, toFolderName, 'bundle.css');
const copyFromFolder = path.join(getDirName, fromFolderName);

const encode = { encoding: 'UTF-8' };
const writeStream = fs.createWriteStream(newFolder, encode);


async function copyFiles(folder) {    
    
    fs.readdir(folder, {withFileTypes: true}, (err, files) => {
        if(err)    {
            throw err;
        }    
        
        files.map(file => {        
            if(file.isFile()) {                              
                
                if(path.extname(file.name) == '.css')
                {                      
                    const readStream = fs.createReadStream(path.join(getDirName, fromFolderName, file.name), encode);
                    readStream.on('data', (chunkwStream) => {
                        writeStream.write(chunkwStream);
                    });
                }

            }
        });
    
    
    });
    


}


copyFiles(copyFromFolder);
