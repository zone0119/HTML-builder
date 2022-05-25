const fs = require('fs');
const path = require('path');
const getDirName = __dirname;
const createFolderName = 'project-dist';

const newFolder = path.join(getDirName, createFolderName);

const mergeStylesFolder = path.join(getDirName, 'project-dist', 'style.css');
const getSrcStylesFolder = path.join(getDirName, 'styles');

const encode = { encoding: 'UTF-8' };
const writeStream = fs.createWriteStream(mergeStylesFolder, encode);

const projectDistAssetsFolder = path.join(getDirName, 'project-dist', 'assets');
const assetsFolder = path.join(getDirName,  'assets');

const TplFile = path.join(getDirName, 'template.html');

const indexHTMLFile = path.join(getDirName, 'project-dist', 'index.html');




let text = '';

const componentFolder = path.join(getDirName, 'components');
let arrCollectTPL= [];
let objCollectTPL= {

};

async function init()
{

    await fs.promises.mkdir(newFolder, { recursive: true });    
    await fs.promises.mkdir(projectDistAssetsFolder, { recursive: true });    

    await recursionCopyDirs(assetsFolder);
    
    await copyStyles(getSrcStylesFolder);

    await recursionCopyFiles(assetsFolder);

   getText();
   await createObjComponent(componentFolder);
  
    


}


function getText(){

    
    const readStream = fs.createReadStream(TplFile, 'utf8');

        readStream.on('data', (chunkwStream) => {                    
                              
                         text += chunkwStream;
                                    
        });
            


}

async function templateFindReplace(objCollectTPL, file) {
    


                    const stopWord = '{{'  + file.name.substring(0, (file.name.length) - 5) + '}}';
                                       
                    let reg = new RegExp(stopWord, "g");

                  

                    text = text.replace(reg, objCollectTPL[stopWord]);                                  

                    let writerStreamToIndexHtml = fs.createWriteStream(indexHTMLFile);    
                    writerStreamToIndexHtml.write(text);


        
}

 function createObjComponent() {

    
    fs.readdir(componentFolder, {withFileTypes: true}, (err, files) => {
        if(err)    {
            throw err;
        }

                files.map(file => {        
                            if(file.isFile()) {                                                
                                const newFile = path.join(getDirName, 'components', file.name);
                                const getTPLStream = fs.createReadStream(newFile, 'utf8');
                        
                                const tpll =  fs.promises.readFile(newFile).then(res => { 
                                    const stopWord = '{{'  + file.name.substring(0, (file.name.length) - 5) + '}}';
                                     saveToObj(res, stopWord);


                                    
                                    templateFindReplace(objCollectTPL, file);


                                });                                                                    
                                
                            }
                    
                    
                                           
                });

                
            
        
    });

   
}

 function saveToObj(res, name){

    let k =   name;
     objCollectTPL[k] =     res.toString();
     

     arrCollectTPL.push(objCollectTPL);

    
}



async function copyStyles(folder) {    
    

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
