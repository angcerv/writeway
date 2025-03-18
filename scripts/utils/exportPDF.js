const electron = require('electron'), 
    path = require('path'),
    fs = require('fs'),
    electronLocalshortcut = require('electron-localshortcut'),
    { app, ipcRenderer } = require('electron'),
    { deleteStrSpaces } = require('./utils');

/** JS FILES **/
const { readAllDirectoryFiles, getTextFromFile } = require('./files'),
    { getAllProjectChapters } = require('../../scripts/services/chapterService'),
    { decodeToken } = require('../utils/tokenOperations');

/** CONSTANTS **/
const projectsPath = '/Users/angelacervantesgarcia/tfg-repo/WriteWayProjects';

/** VARIABLES **/
let project = null,
    userLogged = null;

/** DIVS **/
let pageDiv = document.getElementById('pageDiv');

// Importing BrowserWindow from Main 
const BrowserWindow = electron.remote.BrowserWindow;

var options = { 
    marginsType: 0, 
    pageSize: 'A4', 
    printBackground: true, 
    printSelectionOnly: false, 
    landscape: false
}

/** LISTENERS **/
electronLocalshortcut.register(require('electron').remote.getCurrentWindow(), 'Enter', async () => {
    ipcRenderer.send('exportToDocumentsFolder');
});

ipcRenderer.on('asynchronous-reply', (e, args) => {
    console.log(args) // prints "pong"
    let focuswin = BrowserWindow.getFocusedWindow(); 
    var savepath = args + '/' + deleteStrSpaces(project.projectName) +'.pdf';
    focuswin.webContents.printToPDF(options).then(data => { 
        fs.writeFile(savepath, data, function (err) { 
            if (err) { 
                console.log(err); 
            } else { 
                console.log('PDF Generated Successfully'); 
            } 
            focuswin.close();
        }); 
    }).catch(error => { 
        console.log(error) 
    });
  })

/** FUNCTIONS **/
// <div class="title">${chapters[i].chapterName}</div>
async function initExportPdf() {
    var args = decodeToken(global.location.search.split('=')[1]);
    project = args.project;
    var userToken = args.userToken;
    userLogged = decodeToken(userToken);

    var chapters = await getAllProjectChapters(project._id);
    for (let i = 0; i < chapters.length; i++) {
        var fileContent = chapters[i].content;
        pageDiv.innerHTML += ` 
            <div class="content">${fileContent}</div>`;
    }
    pageDiv.innerHTML += ` 
    <div class="author">Autor: ${userLogged.authorname}</div>`;
}

initExportPdf();
