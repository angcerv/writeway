const { ipcRenderer } = require("electron"),
    jwt = require('jsonwebtoken');

/** JS FILES **/
const { decodeToken } = require('../utils/tokenOperations'),
    { getCurrentDate } = require('../utils/utils'),  
    { updateLastModifiedProject } = require('../../scripts/services/projectService'),
    { initWriteCategory } = require('../../scripts/objects/chapters'),
    { initTemplatesCategory } = require('../../scripts/objects/templates'),
    { initSheetsCategory } = require('../../scripts/objects/sheets'),
    { initCommentsCategory } = require('../../scripts/objects/comments');


/** VARIABLES **/
let project = null,
    userToken = null;

/** DIVS **/
const mhProjectTitle = document.querySelector('#mhProjectTitle');

/** BUTTONS **/
const aSettingsGoOutProject = document.querySelector('#aSettingsGoOutProject'),
    aSettingsExport = document.querySelector('#aSettingsExport'),
    abShareIcon = document.querySelector('#abDownIcon2');

/** FUNCTIONS **/
async function initMainWindow() {
    var args = decodeToken(global.location.search.split('=')[1]);
    project = args.project;
    userToken = args.userToken;
    mhProjectTitle.innerHTML = project.projectName;
    initWriteCategory();
    initTemplatesCategory();
    initSheetsCategory();
    initCommentsCategory();
}

/** LISTENERS **/
aSettingsGoOutProject.addEventListener('click', () => {
    updateLastModifiedProject(project._id, getCurrentDate());
    ipcRenderer.send('goOutProject', userToken);
});

aSettingsExport.addEventListener('click', () => {
    ipcRenderer.send('exportChapters', jwt.sign({ project: project, userToken: userToken }, "sssh"));
});

abShareIcon.addEventListener('click', function(){
    ipcRenderer.send('open-shareOptions', jwt.sign({ project: project, userToken: userToken, isOpenProject: true }, "sssh"));
}, false);

initMainWindow();