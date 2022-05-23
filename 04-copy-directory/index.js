const fs = require('fs');
const path = require('path');
const getDirName = __dirname;
const fromFolderName = 'files';
const toFolderName = 'files-copy';
const newFolder = path.join(getDirName, toFolderName);
const copyFromFolder = path.join(getDirName, fromFolderName);




async function recursionDelFiles(folder) {

    fs.readdir(folder, {withFileTypes: true}, (err, filesDel) => {
        if(err)    {
            throw err;
        }
        
        filesDel.map(file => {      

            const newCopiedFileDir = path.join(folder, file.name);
            

            if(file.isFile()) {                                

                fs.promises.unlink(newCopiedFileDir);
            }
            else
            {
                if(file.isDirectory){

                    recursionDelFiles(newCopiedFileDir);
                    
                }

                
            }


        });



    });
    
}


async function init()
{



    fs.access(newFolder, (err) => {

        if(err)
        {
            fs.promises.mkdir(newFolder, { recursive: true });
        }
        else
        {
            recursionDelFiles(newFolder);  
        }
        
    });
    
    
    
    await fs.promises.mkdir(newFolder, { recursive: true });
    

    await copyFiles();


}



async function copyFiles() {
    fs.readdir(copyFromFolder, {withFileTypes: true}, (err, files) => {
        if(err)    {
            throw err;
        }
    
        files.map(file => {        
            if(file.isFile()) {
                const newFile = path.join(getDirName, fromFolderName, file.name);
                const newCopiedFileDir = path.join(getDirName, toFolderName, file.name);
    
                fs.promises.copyFile(newFile, newCopiedFileDir);
    
                
            }
        });
    
    
    });
    
}







init();
