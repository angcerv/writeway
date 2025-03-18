const { ipcRenderer } = require('electron'),
    { dialog } = require('electron').remote,
    nativeImage = require('electron').nativeImage;

/** JS FILES **/
const { decodeToken } = require('../utils/tokenOperations'),
    { deleteUser, updateAuthorname, updateUsername, updateUserPass } = require('../services/userService');

/** CONSTANTS **/
const appIcon = nativeImage.createFromPath('./assets/img/logo/logo-original.png');

/** VARIABLES **/
let userToken = null,
    userLogged = null;

/** INPUTS **/
editUsername = document.querySelector('#editUsername'),
editAuthorname = document.querySelector('#editAuthorname'),
editPassword1 = document.querySelector('#editPassword1'),
editPassword2 = document.querySelector('#editPassword2'),
editEmail = document.querySelector('#editEmail');

/** BUTTONS **/
let backBtn = document.querySelector('#backBtn'),
    updateBtn = document.querySelector('#updateBtn'),
    deleteBtn = document.querySelector('#deleteBtn');

/** LISTENERS **/
backBtn.addEventListener('click', () => {
    ipcRenderer.send('goBackto-projectsList', userToken);
})

deleteBtn.addEventListener('click', () => {
    showDeleteDialog();
})

editPassword1.addEventListener('beforeinput', (e) => {
    if (editPassword1.value === '') {
        editPassword2.disabled = 'disabled';
    } else {
        editPassword2.disabled = '';
    }
});

updateBtn.addEventListener('click', () => {
    updateUserInfo();
})

/** FUNCTIONS **/
function initEditUser() {
    userToken = global.location.search.split('=')[1];
    userLogged = decodeToken(userToken);
    resetScreen();
}

function resetScreen() {
    editUsername.value = '';
    editAuthorname.value = '';
    editPassword1.value = '';
    editPassword2.value = '';
    editUsername.placeholder = userLogged.username;
    editAuthorname.placeholder = userLogged.authorname;
    editEmail.placeholder = userLogged.email;
}

function showDeleteDialog() {
    var msg = '¿Estás seguro de que quieres borrar tu usuario?';
  
    dialog.showMessageBox(require('electron').remote.getCurrentWindow(), {
      type: 'question',
      title: 'Confirmación',
      message: msg,
      buttons: ['Borrar', 'Cancelar'],
      icon: appIcon
    })
    .then( async function(result) {
      if(result.response == 0) {
        res = await deleteUser(userLogged.userId, userToken);
        if(res) {
            ipcRenderer.send('goto-login');
        }
      }
    })
}

async function updateUserInfo() {
    if(editUsername.value !== '') {
        console.log(userLogged.userId)
        userToken = await updateUsername(userLogged.userId, editUsername.value);
        userLogged = decodeToken(userToken);
        resetScreen();
    }
    if(editAuthorname.value !== '') {
        userToken = await updateAuthorname(userLogged.userId, editAuthorname.value);
        userLogged = decodeToken(userToken);
        resetScreen();
    }
    if(editPassword1.value !== '' && editPassword1.value !== editPassword2.value) {
        editPassword2.value = '';
        editPassword2.placeholder = 'No coincide, vuelva a escribir.'
    } else if (editPassword1.value !== '' && editPassword1.value === editPassword2.value) {
        await updateUserPass(userLogged.userId, editPassword1.value);
        editPassword1.placeholder = 'Actualizada';
        editPassword2.placeholder = 'Actualizada';
        resetScreen();
    }
}

initEditUser();