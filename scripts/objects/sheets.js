/** JS FILES **/
const { getAllProjectSheets, getAllTemplateSheets, addNewSheet, deleteSheet, updateSheetName } = require('../../scripts/services/sheetService'),
    { getAllProjectTemplates } = require('../../scripts/services/templateService'),
    { decodeToken } = require('../utils/tokenOperations'),
    { addAllItemsToList } = require('./manageLists'),
    { addSheetFeatures, saveFeatures } = require('./features'),
    { resetSelectedTemplate } = require('./templates'),
    { resetSelectedChapter } = require('./chapters');

/** VARIABLES **/
let project = null,
    sheetsList = null,
    templatesList = null,
    selectedSheet = null,
    selectedSheetId = null,
    inputTemplateOptions = [];

/** DIVS **/
const sheetsDiv = document.querySelector('#sheets'),
    sheetWorkarea = document.querySelector('#sheetWorkarea'),
    templateWorkarea = document.querySelector('#templateWorkarea'),
    writeWorkarea = document.querySelector('#writeWorkarea'),
    sheetTitle = document.querySelector('#sheetTitle'),
    commentWorkarea = document.querySelector("#commentWorkarea");
    

/** INPUTS **/
const inputTemplateSelect = document.querySelector('#inputTemplateSelect'),
    newSheetInput = document.querySelector('#newSheetInput');

/** BUTTONS **/
const addSheetBtn = document.querySelector('#addSheetBtn'),
    delSheetBtn = document.querySelector('#delSheetBtn');

/** LISTENERS **/
addSheetBtn.addEventListener('click', () => {
    if(newSheetInput.value !== '') {
        createSheet();
    }
});

sheetTitle.addEventListener("input", function() {
    document.getElementById('title'+selectedSheet._id).innerHTML = sheetTitle.innerHTML;

}, false);

delSheetBtn.addEventListener('click', () => {
    removeSheet();
});

/** FUNCTIONS **/  
async function addAllSheets() { 
    
    sheetsDiv.innerHTML = '';
    templatesList = await getAllProjectTemplates(project._id);
    addAllItemsToList('sheetFolder', templatesList, sheetsDiv);

    if(templatesList.length > 0) {
        inputTemplateSelect.innerHTML = ` `;
        inputTemplateOptions = [];
        for (let j = 0; j < templatesList.length; j++) {
            var templateName = templatesList[j].templateName;
            inputTemplateSelect.innerHTML += `<option value='${templateName}'>${templateName}</option>`;
            inputTemplateOptions.push({ value: j, name: templateName });
        }
    } else {
        inputTemplateSelect.innerHTML = `<option>No hay plantillas</option>`;
    }

    for (let i = 0; i < templatesList.length; i++) {
        var goalDiv = document.getElementById(templatesList[i]._id);
        var templateSheets = await getAllTemplateSheets(templatesList[i]._id);

        addAllItemsToList('sheetItem', templateSheets, goalDiv);
    }
    sheetsList = await getAllProjectSheets(project._id);
    addTreeViewFunctionalities();
    addFunctionToTreeViewItems();
}

function addFunctionToTreeViewItems() {
    var goalClass = document.getElementsByClassName('tree-file');
    for(var i = 0; i < goalClass.length; i++) {
        goalClass[i].addEventListener('click', function(){
            clickedSheet(this.id);
        }, false);
    }
}

function addTreeViewFunctionalities() {
    var toggler = document.getElementsByClassName('caret');
    for (var i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener('click', function() {
            this.parentElement.querySelector('.nested').classList.toggle('active');
            this.classList.toggle('caret-down');
            clickedFolder(this.id);
        });
    }
}

async function createSheet() {
    if(selectedSheet !== null) {
        resetSelectedSheet();
    }
    var templateIndex;
    for (let i = 0; i < inputTemplateOptions.length; i++) {
        if(inputTemplateOptions[i].name === inputTemplateSelect.value) {
            templateIndex = i;
        }
    }
    var features = [];
    var selectedTemplateAttributes = templatesList[templateIndex].attributes;
    for (let j = 0; j < selectedTemplateAttributes.length; j++) {
        features.push({ attribute: selectedTemplateAttributes[j], value: '' });
    }
    await addNewSheet(newSheetInput.value, project._id, templatesList[templateIndex]._id, features);
    sheetsList = await getAllProjectSheets(project._id);
    addAllSheets();

    newSheetInput.value = '';
}

async function initSheetsCategory() {
    var args = decodeToken(global.location.search.split('=')[1])
    project = args.project;
    addAllSheets();
}

function clickedFolder(id) {
    var index = id.split('Caret')[1];
    var selected = document.getElementById('wnFolder'+index);
    if(selected.style.background === '') {
        selected.style.background = '#646363';  
    } else if (selected.style.background === 'rgb(100, 99, 99)') {
        selected.style.background = '';
    }
}

function clickedSheet(newItemId) {
    switch (selectedSheetId) {  
        case null:
            selectSheet(newItemId);
        break;  
        case newItemId:
            resetSelectedSheet();
        break;   
        default:
            resetSelectedSheet();
            selectSheet(newItemId);
        break;
    }
}

async function removeSheet() {
    resetSelectedSheet();
    deleteSheet(selectedSheet._id);
    sheetsList = await getAllProjectSheets(project._id);
    addAllSheets();
}

async function resetSelectedSheet() {
    if(selectedSheet.sheetName !== templateTitle.innerHTML) {
        await updateSheetName(selectedSheet._id, sheetTitle.innerHTML);
    }
    document.getElementById(selectedSheetId).style.background = '';
    saveFeatures();
    hideSheetInWorkArea();
    selectedSheetId = null;
    selectedSheet = null;
}

function selectSheet(itemId) {
    selectedSheetId = itemId;
    document.getElementById(selectedSheetId).style.background = '#29676D';  
    for (let index = 0; index < sheetsList.length; index++) {
        if(selectedSheetId === sheetsList[index]._id) {
            selectedSheet = sheetsList[index];
        }
    }
    addSheetFeatures(selectedSheet);
    showSheetInWorkArea();
}

/** workarea **/  
function hideSheetInWorkArea() {
    sheetWorkarea.style.display = 'none';
}

function showSheetInWorkArea() {
    if(templateWorkarea.style.display === 'block') {
        templateWorkarea.style.display = 'none';
        // resetSelectedTemplate();
    }
    if(writeWorkarea.style.display === 'block') {
        writeWorkarea.style.display = 'none';
        // resetSelectedChapter();
    }
    if(commentWorkarea.style.display === 'block') {
        commentWorkarea.style.display = 'none';
        document.querySelector("#aCommentsIcon").style.fill = '';
    }
    sheetTitle.innerHTML = selectedSheet.sheetName;
    sheetWorkarea.style.display = 'block';
}

module.exports = {
    initSheetsCategory: initSheetsCategory,
    addAllSheets: addAllSheets,
    resetSelectedSheet: resetSelectedSheet
}