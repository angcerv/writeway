/** JS FILES **/
const { decodeToken } = require('../utils/tokenOperations'),
    { getAllProjectTemplates, addNewTemplate, deleteTemplate, updateTemplateName } = require('../../scripts/services/templateService'),
    { addAllItemsToList } = require('./manageLists'),
    { initAttributes } = require('./attributes'),
    { addAllSheets, resetSelectedSheet } = require('./sheets');

/** CONSTANTS **/
const project = decodeToken(global.location.search.split('=')[1]).project;

/** VARIABLES **/
let templatesList = null,
    selectedTemplate = null,
    selectedTemplateId = null;

/** DIVS **/
const templatesDiv = document.querySelector("#templates"),
    sheetWorkarea = document.querySelector('#sheetWorkarea'),
    templateWorkarea = document.querySelector('#templateWorkarea'),
    writeWorkarea = document.querySelector('#writeWorkarea'),
    templateTitle = document.querySelector('#templateTitle'),
    commentWorkarea = document.querySelector("#commentWorkarea");

/** INPUTS **/
const newTemplateInput = document.querySelector('#newTemplateInput');

/** BUTTONS **/
const addTemplateBtn = document.querySelector('#addTemplateBtn');

/** LISTENERS **/
addTemplateBtn.addEventListener('click', () => {
    if(newTemplateInput.value !== '') {
        createTemplate();
    }
})

templateTitle.addEventListener("input", function() {
    document.querySelector('#templateText'+selectedTemplateId.split('template')[1]).innerHTML = templateTitle.innerHTML;

}, false);

/** FUNCTIONS **/
function addAllTemplates() {
    addAllItemsToList('template', templatesList, templatesDiv);
    addFunctionToItemsList();
}

function addFunctionToItemsList() {
    var goalClass = document.getElementsByClassName('wn-template-list-text');
    for(var i = 0; i < goalClass.length; i++) {
        goalClass[i].addEventListener('click', function(){
            clickedTemplate(this.id);
        }, false);
        document.querySelector('#delOptionTemplate'+i).addEventListener("click", function(){
            removeTemplate(this.id);
          }, false);
    }
}

function clickedTemplate(newItemId) {
    var index = newItemId.split('Text')[1];
    newItemId = 'template'+index;
    switch (selectedTemplateId) {  
        case null:
            selectTemplate(newItemId);
        break;  
        case newItemId:
            resetSelectedTemplate();
        break;   
        default:
            resetSelectedTemplate();
            selectTemplate(newItemId);
        break;
    }
}

async function createTemplate() {
    
    await addNewTemplate(newTemplateInput.value, project._id, []);
    templatesList = await getAllProjectTemplates(project._id);
    addAllTemplates();

    newTemplateInput.value = '';
    addAllSheets();
}

async function initTemplatesCategory() {
    templatesList = await getAllProjectTemplates(project._id);
    addAllTemplates();
}

function removeTemplate(id) {
    var index = id.split('Template')[1];
    var templateToDelete = templatesList[index];
    deleteTemplate(templateToDelete._id);
    templatesList.splice(index,1);
    if(selectedTemplate !== null) {
        resetSelectedTemplate();
    }
    addAllTemplates();
    addAllSheets();
}

async function resetSelectedTemplate() {
    if(selectedTemplate.templateName !== templateTitle.innerHTML) {
        await updateTemplateName(selectedTemplate._id, templateTitle.innerHTML);
        addAllSheets();
    }
    document.getElementById(selectedTemplateId).style.background = '';
    hideTemplateInWorkArea();
    selectedTemplateId = null;
    selectedTemplate = null;
}

function selectTemplate(itemId) {
    var index = itemId.split('template')[1];
    selectedTemplateId = itemId;
    document.getElementById(selectedTemplateId).style.background = '#29676D';  
    selectedTemplate = templatesList[index];
    showTemplateInWorkArea();
}

/** workarea **/
function hideTemplateInWorkArea() {
    templateWorkarea.style.display = 'none';
    templateTitle.innerHTML = '';
}

function showTemplateInWorkArea() {
    if(sheetWorkarea.style.display === 'block') {
        sheetWorkarea.style.display = 'none';
        resetSelectedSheet();
    }
    if(writeWorkarea.style.display === 'block') {
        writeWorkarea.style.display = 'none';
        // resetSelectedChapter();
    }
    if(commentWorkarea.style.display === 'block') {
        commentWorkarea.style.display = 'none';
        document.querySelector("#aCommentsIcon").style.fill = '';
    }
    templateWorkarea.style.display = 'block';
    templateTitle.innerHTML = selectedTemplate.templateName;
    initAttributes(selectedTemplate);
}


module.exports = {
    initTemplatesCategory: initTemplatesCategory,
    resetSelectedTemplate: resetSelectedTemplate
}