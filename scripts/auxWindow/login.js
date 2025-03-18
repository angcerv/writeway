const { ipcRenderer } = require("electron"),
    electronLocalshortcut = require('electron-localshortcut');

/** JS FILES **/
const { checkEmptyForm } = require('../utils/formsValidation'),
    { logUser } = require('../services/userService');

/** DIVS **/
let loginMessage = document.querySelector('#loginMessage');

/** INPUTS **/
let emailInput = document.querySelector('#loginEmail');
let passwordInput = document.querySelector('#loginPassword');

/** BUTTONS **/
let goToRegisterBtn = document.querySelector('#goToRegisterBtn'),
    loginBtn = document.querySelector('#loginBtn');

/** LISTENERS **/
loginBtn.addEventListener('click', () => {
    login();
})

goToRegisterBtn.addEventListener('click', () => {
    ipcRenderer.send('goto-register');
    console.log('Ir a registro')
})

electronLocalshortcut.register(require('electron').remote.getCurrentWindow(), 'Enter', () => {
    login();
});

/** FUNCTIONS **/
async function login() {
    if(checkEmptyForm([emailInput.value, passwordInput.value])) {
        loginMessage.innerHTML = "Rellene todos los campos para iniciar sesión.";
    } else {
        loginMessage.innerHTML = await logUser(emailInput.value, passwordInput.value);
    }
}
