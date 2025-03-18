var fs = require("fs");

/** DIR - CREATE directory **/
function createDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdir(dir, (err) => { 
            if (err) { 
                return console.error(err); 
            } 
            return dir;
        }); 
    }
}

/** DIR - CREATE new project directory **/
function createNewProjectDirectory(dir) {
    createDirectory(dir);
}


/** DIR - DELETE directory **/
function deleteDirectory(dir) {
    fs.rmdir(dir, { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
        console.log(`${dir} is deleted!`);
    });
}

/** DIR - READ directory files **/
function readAllDirectoryFiles(directoryPath) {
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file); 
        });
        console.log(files)
        return files;
    });
}

/** FILE - GET file **/
function getTextFromFile(urlFile) {
    var data = fs.readFileSync(urlFile);
    return data.toString();
}

/** FILE - WRITE in file **/
function writeInFile(urlFile, content) {
    fs.writeFile(urlFile,content,(err)=>{
        if(err) {
            console.log(err)
        }
    })
}

/** FILE - DELETE file **/
function deleteFile(urlFile) {
    fs.unlink(urlFile, function (err) {
        if (err) throw err;
      });
}


module.exports = {
    createDirectory: createDirectory,
    getTextFromFile: getTextFromFile,
    writeInFile: writeInFile,
    deleteFile: deleteFile,
    createNewProjectDirectory: createNewProjectDirectory,
    deleteDirectory: deleteDirectory,
    readAllDirectoryFiles: readAllDirectoryFiles
};