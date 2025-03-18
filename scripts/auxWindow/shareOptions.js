const { ipcRenderer } = require("electron");
/** JS FILES **/
const { getProjectById, updateAddShareUser, updateDeleteShareUser } = require('../../scripts/services/projectService'),
    { getUserById, getUserByEmail } = require('../../scripts/services/userService'),
    { decodeToken } = require('../utils/tokenOperations');

/** CONSTANTS **/
const projectId = global.location.search.split('=')[1];

/** VARIABLES **/
let project = null,
    userLogged = null,
    userToken = null,
    usersList = [];

/** DIVS **/
const shareUsersDiv = document.querySelector('#shareList'),
    shareMessage = document.querySelector('#shareMessage');

/** INPUTS **/
const newShareUserInput = document.querySelector('#newShareUserInput');

/** BUTTONS **/
let backBtn = document.querySelector('#backBtn'),
    addUserBtn = document.querySelector('#addUserBtn');

/** LISTENERS **/
backBtn.addEventListener('click', () => {
    ipcRenderer.send('goto-projectsList', userToken);
})

addUserBtn.addEventListener('click', () => {
    addUserToShareList();
})


/** FUNCTIONS **/
function addShareUsers() {
    shareUsersDiv.innerHTML = ` `;
    for (let i = 0; i < usersList.length; i++) {
        shareUsersDiv.innerHTML += ` 
        <div class="so-list-item">
            <div class="so-list-name">${usersList[i].username}</div>
            <div class="so-list-email">${usersList[i].email}</div>
            <svg id="delOptionUser${i}" class="so-list-deleteIcon svg-fill-2 pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 1H15C16.1046 1 17 1.89543 17 3V4H20C21.1046 4 22 4.89543 22 6V8C22 9.10457 21.1046 10 20 10H19.9199L19 21C19 22.1046 18.1046 23 17 23H7C5.89543 23 5 22.1046 5.00345 21.083L4.07987 10H4C2.89543 10 2 9.10457 2 8V6C2 4.89543 2.89543 4 4 4H7V3C7 1.89543 7.89543 1 9 1ZM4 6H7H17H20V8H4V6ZM6.08649 10H17.9132L17.0035 20.917L17 21H7L6.08649 10ZM15 3V4H9V3H15ZM13.4142 15L15.7071 17.2929L14.2929 18.7071L12 16.4142L9.70711 18.7071L8.29289 17.2929L10.5858 15L8.29289 12.7071L9.70711 11.2929L12 13.5858L14.2929 11.2929L15.7071 12.7071L13.4142 15Z"/>
            </svg>
        </div>
        `;
    }
    addFunctionToItemsList();
}

function addFunctionToItemsList() {
    var goalClass = document.getElementsByClassName('so-list-item');
    for(var i = 0; i < goalClass.length; i++) {
        goalClass[i].querySelector('#delOptionUser'+i).addEventListener("click", function(){
            removeShareUser(this.id);
        }, false);
    }
}

async function addUserToShareList() {
    if(newShareUserInput.value === '') {
        shareMessage.innerHTML = 'El campo para añadir usuario está vacío.';
    } else {
        var res = await getUserByEmail(newShareUserInput.value);
        if(res.isFound) {
            await updateAddShareUser(project._id, { userId: res._id });
            project = await getProjectById(project._id);
            updateUserListById();
        } else {
            shareMessage.innerHTML = res.message;
        }
        newShareUserInput.value = '';
        shareMessage.innerHTML = '';
    }
}

async function initShareOptions() {
    var args = decodeToken(global.location.search.split('=')[1]);
    if(args.isOpenProject) {
        backBtn.style.display = 'none';
    }
    project = await getProjectById(args.project._id);
    userToken = args.userToken;
    userLogged = decodeToken(userToken);
    // newShareUserInput.placeholder = 'Compartir el proyecto "' +project.projectName + '" con...';
    newShareUserInput.placeholder = 'Escribe el correo completo de otro usuario...';
    updateUserListById();
}

async function removeShareUser(divId) {
    var userId = usersList[divId.split('User')[1]];
    await updateDeleteShareUser(project._id, userId._id);
    project = await getProjectById(project._id);
    updateUserListById();
}

async function updateUserListById() {
    usersList = [];
    for (let i = 0; i < project.shareUsers.length; i++) {
        if(project.shareUsers[i].userId !== userLogged.userId) {
            var newUser = await getUserById(project.shareUsers[i].userId);
            usersList.push(newUser);
        }
    }
    addShareUsers();
}

initShareOptions();