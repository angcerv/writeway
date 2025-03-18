const { ipcRenderer } = require("electron"),
    jwt = require('jsonwebtoken');

/** JS FILES **/
const { addAllItemsToList } = require('./manageLists'),
    { decodeToken } = require('../utils/tokenOperations'),
    { getAllUserProjects, deleteProject, addNewProject } = require('../../scripts/services/projectService'),
    { deleteChapterByProject } = require('../../scripts/services/chapterService'),
    { deleteSheetByProject } = require('../../scripts/services/sheetService'),
    { deleteTemplateByProject } = require('../../scripts/services/templateService'),
    { dialog } = require('electron').remote,
	nativeImage = require('electron').nativeImage;

/** CONSTANTS **/
const appIcon = nativeImage.createFromPath('./assets/img/logo/logo-original.png'),
    userToken = global.location.search.split('=')[1],
    userLogged = decodeToken(userToken);

/** VARIABLES **/
let projectList = null,
    selectedProject = null,
    selectedProjectId = null;

/** DIVS **/
const projectsDiv = document.querySelector('#projects'),
    projectsListWindow = document.querySelector('#projectsList'),
    newProjectWindow = document.querySelector('#newProject');

/** INPUTS **/
const newProjectInput = document.querySelector('#newProjectInput');

/** BUTTONS **/
const openBtn = document.querySelector('#openBtn');

/** ICONS **/
const svgPenTool = document.querySelector('#svgPenTool');

/** FUNCTIONS **/
async function addAllProjects() {
    projectList = [];
    projectList = await getAllUserProjects(userLogged.userId);
    addAllItemsToList('project', projectList, projectsDiv);
    addFunctionToItemsList();
}

function addFunctionToItemsList() {
    var goalClass = document.getElementsByClassName('card-project-element');
    for(var i = 0; i < goalClass.length; i++) {
        goalClass[i].querySelector('#cardTitleProject'+i).addEventListener('click', function(){
            clickedProject(this.id);
        }, false);
        goalClass[i].querySelector('#delOptionProject'+i).addEventListener("click", function(){
            removeProject(this.id);
        }, false);
        goalClass[i].querySelector('#shareOption'+i).addEventListener("click", function(){
            shareProject(this.id);
        }, false);
    }
}

function clickedProject(newItemId) {
    switch (selectedProjectId) {  
        case null:
            selectProject(newItemId);
        break;  
        case newItemId:
            resetSelectedProject();
        break;   
        default:
            resetSelectedProject();
            selectProject(newItemId);
        break;
    }
}

async function createProject() {
    await addNewProject(newProjectInput.value, userLogged.userId, [{userId: userLogged.userId }]);
    addAllProjects();
    projectsListWindow.style.display = 'block';
    newProjectWindow.style.display = 'none';
    svgPenTool.style.display = 'none';
    newProjectInput.value = '';
}

function getSelectedProject() {
    return selectedProject;
}

async function removeProject(itemId) {
    var index = itemId.split('Project')[1];
    var msg = '¿Estás seguro de que quieres borrar el proyecto "'+projectList[index].projectName+'"?';
  
    dialog.showMessageBox(require('electron').remote.getCurrentWindow(), {
      type: 'question',
      title: 'Confirmación',
      message: msg,
      buttons: ['Borrar', 'Cancelar'],
      icon: appIcon
    })
    .then( async function(result) {
      if(result.response == 0) {
        if(selectedProject !== null) {
            resetSelectedProject();
        }
        await deleteChapterByProject(projectList[index]._id);
        await deleteSheetByProject(projectList[index]._id);
        await deleteTemplateByProject(projectList[index]._id);
        res = await deleteProject(projectList[index]._id);
        if(res) {
            projectList.splice(index,1);
            addAllProjects();
        }
      }
    })
}

function resetSelectedProject() {
    var idToColor = selectedProjectId.split('Title')[1].toLowerCase();
    document.getElementById(idToColor).style.background = '#333333';
    selectedProjectId = null;
    selectedProject = null;
    openBtn.disabled = 'disabled';
}

function selectProject(itemId) {
    var index = itemId.split('Project')[1];
    var idToColor = itemId.split('Title')[1].toLowerCase();
    document.getElementById(idToColor).style.background = '#29676D';  
    selectedProjectId = itemId;
    selectedProject = projectList[index];
    openBtn.disabled = '';
}

function shareProject(id) {
    ipcRenderer.send('open-shareOptions', jwt.sign({ project: projectList[id.split('Option')[1]], userToken: userToken, isOpenProject: false }, "sssh"));
}

module.exports = {
    addAllProjects: addAllProjects,
    removeProject: removeProject,
    createProject: createProject,
    getSelectedProject: getSelectedProject
}