const fs = require('fs');
const path = require('path');
const getDirName = __dirname;
const createFolderName = 'project-dist';

const newFolder = path.join(getDirName, createFolderName);

const mergeStylesFolder = path.join(getDirName, 'project-dist', 'style.css');
const getSrcStylesFolder = path.join(getDirName, 'styles');

const encode = { encoding: 'UTF-8' };
const writeStream = fs.createWriteStream(mergeStylesFolder, encode);

const assetsFolder = path.join(getDirName, 'assets');
const newAssetsFolder = path.join(getDirName, 'project-dist', 'assets');

async function init()
{

    await fs.promises.mkdir(newFolder, { recursive: true });    

   // await fs.rm(newFolder, {recursive: true, force: true});

    
    await recursionCopyDirs(assetsFolder);
    


    await copyStyles(getSrcStylesFolder);

    await recursionCopyFiles(assetsFolder);

    console.log('Прошу данное задание проверить через день.');

}


async function copyStyles(folder) {    
    
console.log(folder);

    fs.readdir(folder, {withFileTypes: true}, (err, files) => {
        if(err)    {
            throw err;
        }    
        
        files.map(file => {        
            if(file.isFile()) {                              
                
                if(path.extname(file.name) == '.css')
                {                      
                    const readStream = fs.createReadStream(path.join(getDirName, 'styles', file.name), encode);
                    readStream.on('data', (chunkwStream) => {
                        writeStream.write(chunkwStream);
                    });
                }

            }
        });
    
    
    });
    


}



async function recursionCopyFiles(fromFolder) {

    await   fs.readdir(fromFolder, {withFileTypes: true}, (err, filesDel) => {
        if(err)    {
            throw err;
        }
        
        filesDel.map(file => {      
            const newFile = path.join(fromFolder, file.name);    
            const toDir = path.join(path.parse(newFile).dir.replace("\\06-build-page\\assets", "\\06-build-page\\project-dist\\assets"), file.name);
  
            if(file.isFile()) {    
                fs.promises.copyFile(newFile, toDir);                
            }
            else
            {
                if(file.isDirectory){
                    
                     //fs.promises.mkdir(toDir, { recursive: true });
                    recursionCopyFiles(newFile);                    
                }
                
            }


        });



    });
    
}


async function recursionCopyDirs(fromFolder) {

    await   fs.readdir(fromFolder, {withFileTypes: true}, (err, filesDel) => {
        if(err)    {
            throw err;
        }
        
        filesDel.map(file => {      
            const newFile = path.join(fromFolder, file.name);    
            const toDir = path.join(path.parse(newFile).dir.replace("\\06-build-page\\assets", "\\06-build-page\\project-dist\\assets"), file.name);
  
            if(file.isFile()) {    
                //fs.promises.copyFile(newFile, toDir);                
            }
            else
            {
                if(file.isDirectory){
                    
                     fs.promises.mkdir(toDir, { recursive: true });
                     recursionCopyDirs(newFile);                    
                }
                
            }


        });



    });
    
}




 init();
