const { clickedProject } = require('./projects'),
    { getHTMLProjectListItem, getHTMLChapterListItem, getHTMLTemplateListItem,
        getHTMLAttributeListItem, getHTMLSheetFolderTreeView,getHTMLSheetItemTreeView,
        getHTMLFeatureListItem, getHTMLComment, getHTMLTaskListItem } = require('../utils/textHTML');

function addAllItemsToList(objectType, list, goalDiv) {
    goalDiv.innerHTML = ` `;
    switch (objectType) {
        case 'project':
            for (let i = 0; i < list.length; i++) {  
                goalDiv.innerHTML += getHTMLProjectListItem(i, list[i].projectName, list[i].lastModified);
            }
            break;
        case 'chapter':
            for (let i = 0; i < list.length; i++) {  
                goalDiv.innerHTML += getHTMLChapterListItem(i, list[i].chapterName);
            }
            break;
        case 'template':
            for (let i = 0; i < list.length; i++) {  
                goalDiv.innerHTML += getHTMLTemplateListItem(i, list[i].templateName);
            }
            break;
        case 'attribute':
            for (let i = 0; i < list.length; i++) {  
                goalDiv.innerHTML += getHTMLAttributeListItem(i, list[i]);
            }
            break;
        case 'sheetFolder':
            for (let i = 0; i < list.length; i++) {  
                goalDiv.innerHTML += getHTMLSheetFolderTreeView(i, list[i].templateName, list[i]._id);
            }
            break;
        case 'sheetItem':
            for (let i = 0; i < list.length; i++) {  
                goalDiv.innerHTML += getHTMLSheetItemTreeView(list[i].sheetName, list[i]._id);
            }
            break;
        case 'feature':
            for (let i = 0; i < list.length; i++) {  
                goalDiv.innerHTML += getHTMLFeatureListItem(i, list[i].attribute, list[i].value);
            }
            break;
        case 'comment':
            for (let i = 0; i < list.length; i++) {  
                goalDiv.innerHTML += getHTMLComment(i, list[i].commentAuthor, list[i].commentMessage, list[i].date);
            }
            break;
        case 'task':
            for (let i = 0; i < list.length; i++) {  
                goalDiv.innerHTML += getHTMLTaskListItem(i, list[i].text, list[i].done, list[i].assigned);
            }
            break;
    }  
}

function addFunctionToItems(goalClass, goalDivId, selectedItem) {
        for(var i = 0; i < goalClass.length; i++) {
            goalClass[i].querySelector(goalDivId+i).addEventListener("click", function(){
                clickedItem(this.id, selectedItem);
    }, false);
    }
}

function clickedItem(newItemId, selectedItemId) {
    switch (selectedItemId) {  
        case null:
            return 0; //selectItem(newItemId);
        break;  
        case newItemId:
            return 1; //resetSelectedItem(selectedItemId);
        break;   
        default:
            return 3; // resetSelectedItem(selectedItemId) // selectItem(newItemId);
        break;
    }
}

function getSelectedDivIndex(objectType, selectedDiv) {
    return selectedDiv.id.split(objectType)[1];
}

module.exports = {
    addAllItemsToList: addAllItemsToList,
    getSelectedDivIndex: getSelectedDivIndex
}