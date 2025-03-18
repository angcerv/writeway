const { ipcRenderer } = require("electron");

/** JS FILES **/
const { initConsultnav, hideInfoArea } = require('./consultnav');

/** DIVS **/
const workarea = document.querySelector('#workarea'),
    worknav = document.querySelector('#worknav'),
    consultnav = document.querySelector('#consultnav'),

    worknavWrite = document.querySelector('#worknavWrite'),
    worknavTemplates = document.querySelector('#worknavTemplates'),
    worknavSheets = document.querySelector('#worknavSheets');

/** BUTTONS **/
const abUpIcon1 = document.querySelector('#abUpIcon1'),
    abUpIcon2 = document.querySelector('#abUpIcon2'),
    abUpIcon3 = document.querySelector('#abUpIcon3'),

    abConsultIcon = document.querySelector('#abDownIcon1'),
    abShareIcon = document.querySelector('#abDownIcon2');

/** BOOLEANS **/
let worknavIsOpen = false,
    consultnavIsOpen = false;

/** SELECTED ITEMS **/
let abSelectedIcon = null,
    worknavCategoryShowed = null;

/** OBJECTS **/
const worknavCategories = {
    abUpIcon1: 'worknavWrite',
    abUpIcon2: 'worknavTemplates',
    abUpIcon3: 'worknavSheets'
};

/** LISTENERS **/
for(var i = 1; i < 4; i++)
{
    var abIcon = document.querySelector('#abUpIcon'+i);
    abIcon.addEventListener('click', function(){
        upIconClicked(this.id);
    }, false);
}

abConsultIcon.addEventListener('click', function(){
    switch (consultnavIsOpen) {
        case false:  
            openConsultnav();
            break;
        
        case true:
            closeConsultnav()
            break;
    }
}, false);

/** FUNCTIONS **/

/** asideBar **/
function upIconClicked(iconId) {
    switch (worknavIsOpen) {
        case false:          
            openWorknav(iconId);
            break;
        
        case true:
            if(iconId === abSelectedIcon) {
                closeWorknav();
            } else {
                resetSelectedabIcon();
                resetWorknavCategory();
                openWorknav(iconId);
            }
            break;
    }
}

function resetSelectedabIcon() {
    document.getElementById(abSelectedIcon).style.fill = '';
    abSelectedIcon = null;
}

function setSelectedabIcon(iconId) {
    abSelectedIcon = iconId;
    document.getElementById(abSelectedIcon).style.fill = '#3F888F';
}

/** worknav **/
function closeWorknav() {
    worknav.style.width = '0';
    if(consultnavIsOpen) {
        workarea.style.width = '74.2vw';
    } else {
        workarea.style.width = '96.3vw';
    }
    resetSelectedabIcon();
    resetWorknavCategory();
    worknavIsOpen = false;
}

function openWorknav(iconId) {
    worknav.style.width = '19vw';
    if(consultnavIsOpen) {
        if(worknavCategories[iconId] === 'worknavSheets') {
            closeConsultnav();
            workarea.style.width = '77.3vw';
        } else {
            workarea.style.width = '55.1vw';
        }
    } else {
        workarea.style.width = '77.3vw';
    }
    setSelectedabIcon(iconId);
    setWorknavCategory(worknavCategories[iconId]);
    worknavIsOpen = true;
}

function resetWorknavCategory() {
    document.getElementById(worknavCategoryShowed).style.display = 'none';
    worknavCategoryShowed = null;
}

function setWorknavCategory(selectedCategory) {
    worknavCategoryShowed = selectedCategory;
    document.getElementById(worknavCategoryShowed).style.display = 'block';
}

/** consultNav **/
function closeConsultnav() {
    abConsultIcon.style.stroke = '#C4C4C4';
    consultnav.style.display = 'none';
    consultnav.style.width = '0';
    if(worknavIsOpen) {
        workarea.style.width = '77.3vw';       
    } else {
        workarea.style.width = '96.3vw';
    }
    hideInfoArea();
    consultnavIsOpen = false;
}

function openConsultnav() {
    abConsultIcon.style.stroke = '#3F888F';
    consultnav.style.display = 'block';
    consultnav.style.width = '22vw';
    if(worknavIsOpen) {
        if(worknavCategoryShowed === 'worknavSheets') {
            closeWorknav();
            workarea.style.width = '74.2vw';
        } else {
            workarea.style.width = '55.1vw';
        }
    } else {
        workarea.style.width = '74.2vw';
    }
    
    initConsultnav(); 
    consultnavIsOpen = true;
}