/** JS FILES **/
const { updateTemplateAttributes } = require('../../scripts/services/templateService'),
    { addAllItemsToList } = require('./manageLists'),
    { updateSheetsAddAtribute, updateSheetsRemoveAtribute } = require('../../scripts/services/sheetService'),
    { addAllSheets } = require('./sheets');
    
/** VARIABLES **/
let attributesList = null,
    selectedTemplate = null,
    selectedAttribute = null,
    selectedDivAttributeId = null;

/** DIVS **/
const attributesDiv = document.querySelector('#attributes');

/** BUTTONS **/
const addAttributeBtn = document.querySelector('#addAttributeBtn');

/** INPUTS **/
const newAttributeInput = document.querySelector('#newAttributeInput');

/** LISTENERS **/
addAttributeBtn.addEventListener('click', () => {
    if(newAttributeInput.value !== '') {
        createAttribute();
    }
})

/** FUNCTIONS **/
function addAllAttributes() {
    attributesList = selectedTemplate.attributes;
    addAllItemsToList('attribute', attributesList, attributesDiv);
    addFunctionToItemsList();
}

function addFunctionToItemsList() {
    var goalClass = document.getElementsByClassName('wa-attribute-list-title');
    for(var i = 0; i < goalClass.length; i++) {
        goalClass[i].addEventListener('click', function(){
            clickedAttribute(this.id);
        }, false);
        document.querySelector('#delOptionAttribute'+i).addEventListener("click", function(){
            removeAttribute(this.id);
          }, false);
    }
}

function clickedAttribute(newItemId) {
    var index = newItemId.split('Attribute')[1];
    newItemId = 'attribute'+index;
    switch (selectedDivAttributeId) {  
        case null:
            selectAttribute(newItemId);
        break;  
        case newItemId:
            resetSelectedAttribute();
        break;
    
        default:
            resetSelectedAttribute()
            selectAttribute(newItemId);
        break;
    }
}

async function createAttribute() {
    attributesList.push(newAttributeInput.value);
    await updateTemplateAttributes(selectedTemplate._id, attributesList);
    await updateSheetsAddAtribute(selectedTemplate._id, {attribute: newAttributeInput.value, value: ''});
    
    newAttributeInput.value = '';
    addAllAttributes();
    addAllSheets();
}

function initAttributes(template) {  
    selectedTemplate = template;
    addAllAttributes();
}

function selectAttribute(divId) {
    document.getElementById(divId).style.background = '#333333';
    document.getElementById(divId).style.borderColor = '#FFFFFF';
    document.getElementById(divId).style.color = '#FFFFFF';
    document.getElementById(divId).style.fontWeight = 'var(--font-weight-regular)';
    selectedDivAttributeId = divId;
    selectedAttribute = attributesList[selectedDivAttributeId.split('attribute')[1]];
}

async function removeAttribute(id) {
    var attribute = attributesList[id.split('Attribute')[1]];
    attributesList.splice(id.split('Attribute')[1],1);
    await updateTemplateAttributes(selectedTemplate._id, attributesList);
    await updateSheetsRemoveAtribute(selectedTemplate._id, attribute);
    
    if(selectedAttribute !== null) {
        resetSelectedAttribute();
    }
    addAllAttributes();
    addAllSheets();
}

function resetSelectedAttribute() {
    document.getElementById(selectedDivAttributeId).style.background = 'rgba(196, 196, 196, 0.2)';
    document.getElementById(selectedDivAttributeId).style.borderColor = '#C4C4C4';
    document.getElementById(selectedDivAttributeId).style.color = '#C4C4C4';
    document.getElementById(selectedDivAttributeId).style.fontWeight = 'var(--font-weight-light)';
    selectedDivAttributeId = null;
    selectedAttribute = null;
}

module.exports = {
    initAttributes: initAttributes
}