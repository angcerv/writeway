const { ipcRenderer } = require('electron'),
    jwt = require('jsonwebtoken');

/** JS FILES **/   
const { addAllProjects, createProject, getSelectedProject } = require('../objects/projects'),
  { decodeToken } = require('../utils/tokenOperations');

/** CONSTANTES **/
const userToken = global.location.search.split('=')[1],
    userLogged = decodeToken(userToken);

/** DIVS **/
let username = document.querySelector('#username'),
    projectsListWindow = document.querySelector('#projectsList'),
    newProjectWindow = document.querySelector('#newProject');

/** BUTTONS **/
let goToCreateBtn = document.querySelector('#goToCreateBtn'),
    openBtn = document.querySelector('#openBtn'),
    createBtn = document.querySelector('#createBtn'),
    backBtn = document.querySelector('#backBtn'),
    exitIcon = document.querySelector('#exitIcon'),
    userIcon = document.querySelector('#userIcon');

/** ICONS **/
let svgPenTool = document.querySelector('#svgPenTool');

/** LISTENERS **/
backBtn.addEventListener('click', () => {
    projectsListWindow.style.display = 'block';
    newProjectWindow.style.display = 'none';
    svgPenTool.style.display = 'none';
})

createBtn.addEventListener('click', () => {
    createProject();
})

exitIcon.addEventListener('click', () => {
    ipcRenderer.send('goto-login');
})

goToCreateBtn.addEventListener('click', () => {
    projectsListWindow.style.display = 'none';
    newProjectWindow.style.display = 'block';
    svgPenTool.style.display = 'block';
})

openBtn.addEventListener('click', () => {
    ipcRenderer.send('open-project', jwt.sign({ project: getSelectedProject(), userToken: userToken }, "sssh"));
})

userIcon.addEventListener('click', () => {
    ipcRenderer.send('goto-editUser', userToken);
})

/** FUNCTIONS **/
async function initProjectsList() {
    addAllProjects();
    username.innerHTML = userLogged.username;
    svgPenTool.style.display = 'none';
}

initProjectsList();