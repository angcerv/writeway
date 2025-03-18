const { ipcRenderer } = require("electron"),
    { checkEmptyForm, compareInputs } = require('../utils/formsValidation'),
    { addNewUser } = require('../../scripts/services/userService');

/** INPUTS **/
let usernameInput = document.querySelector('#usernameInput'),
    authornameInput = document.querySelector('#authornameInput'),
    emailInput1 = document.querySelector('#emailInput1'),
    emailInput2 = document.querySelector('#emailInput2'),
    passwordInput1 = document.querySelector('#passwordInput1'),
    passwordInput2 = document.querySelector('#passwordInput2'),
    checkBox = document.getElementById("remindmeCheckbox"),
    rightContainer1 = document.getElementById('rightContainer1'),
    rightContainer2 = document.getElementById('rightContainer2'),
    rightContainer3 = document.getElementById('rightContainer3'),
    leftContainer1 = document.getElementById('leftContainer1'),
    leftContainer2 = document.getElementById('leftContainer2');

/** BUTTONS **/
let goToLoginBtn = document.querySelector('#goToLoginBtn'),
    backBtn = document.querySelector('#backBtn'),
    nextBtn = document.querySelector('#nextBtn'),
    confirmBtn = document.querySelector('#confirmBtn'),
    finishBtn = document.querySelector('#finishBtn');

/** ICONS **/
let svgUsername = document.querySelector('#svgUsername'),
svgAuthorname = document.querySelector('#svgAuthorname'),
svgMail1 = document.querySelector('#svgMail1'),
svgMail2 = document.querySelector('#svgMail2'),
svgKey1 = document.querySelector('#svgKey1'),
svgKey2 = document.querySelector('#svgKey2');

/** LISTENERS **/
goToLoginBtn.addEventListener('click', () => {
    ipcRenderer.send('goBackto-login');
})

nextBtn.addEventListener('click', () => {

    if(checkEmptyForm([usernameInput.value, authornameInput.value])) {
        registerMessage1.innerHTML = "Rellene todos los campos.";
    } else {
        hideFirstWindow();
        showSecondWindow();
    }
})

backBtn.addEventListener('click', () => {
    showFirstWindow();
    hideSecondWindow();
})

confirmBtn.addEventListener('click', () => {
    register();
})

finishBtn.addEventListener('click', () => {
    ipcRenderer.send('goto-login');
})

/** FUNCTIONS **/
function checkRegisterForm() {
    var isOk = false;
    if(checkEmptyForm([emailInput1.value, passwordInput1.value, emailInput2.value, passwordInput2.value])) {
        registerMessage2.innerHTML = "Rellene todos los campos.";
    } else if (!compareInputs(emailInput1.value, emailInput2.value)) {
        registerMessage2.innerHTML = "Los correos no coinciden.";
    } else if (!compareInputs(passwordInput1.value, passwordInput2.value)) {
        registerMessage2.innerHTML = "Las contraseñas no coinciden.";
    } else if (!checkBox.checked) {
        registerMessage2.innerHTML = "Debe aceptar los Términos y Condiciones de Privacidad.";
    } else {
        isOk = true;
    }
    return isOk;
}

function hideSecondWindow() {
    rightContainer2.style.display = 'none';
    svgMail1.style.display = 'none';
    svgKey1.style.display = 'none';
    svgMail2.style.display = 'none';
    svgKey2.style.display = 'none';
}

function hideFirstWindow() {
    rightContainer1.style.display = 'none';
    svgUsername.style.display = 'none';
    svgAuthorname.style.display = 'none';
}

function initRegister() {
    hideSecondWindow();
}

function showFirstWindow() {
    rightContainer1.style.display = 'block';
    svgUsername.style.display = 'block';
    svgAuthorname.style.display = 'block';
}

function showSecondWindow() {
    rightContainer2.style.display = 'block';
    svgMail1.style.display = '';
    svgKey1.style.display = '';
    svgMail2.style.display = '';
    svgKey2.style.display = '';
}

async function register() {
    if(checkRegisterForm()) {
        var res = await addNewUser(emailInput1.value, passwordInput1.value, usernameInput.value, authornameInput.value);
        if(res) {  
            hideSecondWindow();         
            rightContainer3.style.display = 'block';
            leftContainer1.style.display = 'none';
            leftContainer2.style.display = 'block';           
        }  else {
            registerMessage2.innerHTML = "No pudo registrarse su usuario.";
        }
    }

    
}

initRegister();