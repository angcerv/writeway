/** JS FILES **/
const { write } = require('fs');
const { decodeToken } = require('../utils/tokenOperations'),
    { getAllProjectSheets, getAllTemplateSheets, addNewSheet, deleteSheet } = require('../../scripts/services/sheetService'),
    { getAllProjectTemplates } = require('../../scripts/services/templateService');

/** DIVS **/
const consultDiv = document.getElementById('consultList'),
    infoareaTitle = document.getElementById('infoareaTitle'),
    cnContainer = document.getElementById('cnContainer'),
    sheetInfo = document.getElementById('sheetInfo');

const sheetInfoIcon = document.getElementById('sheetInfoIcon');

/** VARIABLES **/
let project = decodeToken(global.location.search.split('=')[1]).project,
    templatesList = null,
    sheetsList = null,
    selectedConsultItemId = null,
    selectedConsultItem = null;

/** FUNCTIONS **/    
async function initConsultnav() {
    templatesList = await getAllProjectTemplates(project._id);
    sheetsList = await getAllProjectSheets(project._id);

    consultDiv.innerHTML = ` `;

    for (let i = 0; i < templatesList.length; i++) {
        
        consultDiv.innerHTML += `
        <ul class="myUL">
            <li class="cn-tree-root cn-tree-item-background"><span id="wnCaret" class="cn-caret pointer disabled-select">${templatesList[i].templateName}</span>
            <ul id="cnFolder${i}" class="cn-nested">     
            </ul>
            </li>
        </ul>
        `;
        var templateSheets = await getAllTemplateSheets(templatesList[i]._id);
        for (let j = 0; j < templateSheets.length; j++) {
            var goalDiv = document.getElementById('cnFolder'+i);
            goalDiv.innerHTML += ` 
            <li id="myConsult${templateSheets[j]._id}" class="cn-tree-file cn-tree-item-background pointer disabled-select">
                <svg class="wn-sheet-icon" viewBox="0 0 28 25" fill="#C4C4C4" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 16.6667H10.5C10.1905 16.6667 9.89379 16.7765 9.675 16.9718C9.45621 17.1672 9.33329 17.4321 9.33329 17.7084C9.33329 17.9846 9.45621 18.2496 9.675 18.4449C9.89379 18.6403 10.1905 18.75 10.5 18.75H17.5C17.8094 18.75 18.1061 18.6403 18.3249 18.4449C18.5437 18.2496 18.6666 17.9846 18.6666 17.7084C18.6666 17.4321 18.5437 17.1672 18.3249 16.9718C18.1061 16.7765 17.8094 16.6667 17.5 16.6667ZM10.5 10.4167H11.6666C11.976 10.4167 12.2728 10.307 12.4916 10.1116C12.7104 9.91626 12.8333 9.65131 12.8333 9.37504C12.8333 9.09877 12.7104 8.83382 12.4916 8.63847C12.2728 8.44312 11.976 8.33337 11.6666 8.33337H10.5C10.1905 8.33337 9.89379 8.44312 9.675 8.63847C9.45621 8.83382 9.33329 9.09877 9.33329 9.37504C9.33329 9.65131 9.45621 9.91626 9.675 10.1116C9.89379 10.307 10.1905 10.4167 10.5 10.4167ZM17.5 12.5H10.5C10.1905 12.5 9.89379 12.6098 9.675 12.8051C9.45621 13.0005 9.33329 13.2654 9.33329 13.5417C9.33329 13.818 9.45621 14.0829 9.675 14.2783C9.89379 14.4736 10.1905 14.5834 10.5 14.5834H17.5C17.8094 14.5834 18.1061 14.4736 18.3249 14.2783C18.5437 14.0829 18.6666 13.818 18.6666 13.5417C18.6666 13.2654 18.5437 13.0005 18.3249 12.8051C18.1061 12.6098 17.8094 12.5 17.5 12.5ZM22.995 15.9271C22.884 15.8323 22.7532 15.758 22.61 15.7084C22.4707 15.652 22.3195 15.6228 22.1666 15.6228C22.0137 15.6228 21.8626 15.652 21.7233 15.7084C21.5801 15.758 21.4492 15.8323 21.3383 15.9271C21.2352 16.0284 21.1524 16.1446 21.0933 16.2709C21.0039 16.4606 20.9795 16.6697 21.0231 16.8717C21.0667 17.0738 21.1764 17.2598 21.3383 17.4063C21.4473 17.5028 21.5766 17.5792 21.7187 17.6311C21.8609 17.6829 22.0131 17.7092 22.1666 17.7084C22.3191 17.7067 22.4697 17.6784 22.61 17.625C22.7513 17.5723 22.8816 17.4983 22.995 17.4063C23.1568 17.2598 23.2665 17.0738 23.3101 16.8717C23.3537 16.6697 23.3293 16.4606 23.24 16.2709C23.1809 16.1446 23.098 16.0284 22.995 15.9271ZM23.3333 9.31254C23.3211 9.21685 23.2977 9.12257 23.2633 9.03129V8.93754C23.2072 8.83044 23.1324 8.73198 23.0416 8.64587L16.0416 2.39587C15.9452 2.31485 15.8349 2.24804 15.715 2.19796C15.6801 2.19354 15.6448 2.19354 15.61 2.19796C15.4914 2.13727 15.3606 2.09832 15.225 2.08337H8.16663C7.23837 2.08337 6.34813 2.41261 5.69175 2.99867C5.03537 3.58472 4.66663 4.37957 4.66663 5.20837V19.7917C4.66663 20.6205 5.03537 21.4154 5.69175 22.0014C6.34813 22.5875 7.23837 22.9167 8.16663 22.9167H17.5C17.8094 22.9167 18.1061 22.807 18.3249 22.6116C18.5437 22.4163 18.6666 22.1513 18.6666 21.875C18.6666 21.5988 18.5437 21.3338 18.3249 21.1385C18.1061 20.9431 17.8094 20.8334 17.5 20.8334H8.16663C7.85721 20.8334 7.56046 20.7236 7.34167 20.5283C7.12288 20.3329 6.99996 20.068 6.99996 19.7917V5.20837C6.99996 4.93211 7.12288 4.66716 7.34167 4.4718C7.56046 4.27645 7.85721 4.16671 8.16663 4.16671H14V7.29171C14 8.12051 14.3687 8.91537 15.0251 9.50142C15.6815 10.0875 16.5717 10.4167 17.5 10.4167H21V12.5C21 12.7763 21.1229 13.0413 21.3417 13.2366C21.5605 13.432 21.8572 13.5417 22.1666 13.5417C22.476 13.5417 22.7728 13.432 22.9916 13.2366C23.2104 13.0413 23.3333 12.7763 23.3333 12.5V9.37504C23.3333 9.37504 23.3333 9.37504 23.3333 9.31254ZM17.5 8.33337C17.1905 8.33337 16.8938 8.22363 16.675 8.02828C16.4562 7.83293 16.3333 7.56798 16.3333 7.29171V5.63546L19.355 8.33337H17.5ZM22.1666 18.75C21.8572 18.75 21.5605 18.8598 21.3417 19.0551C21.1229 19.2505 21 19.5154 21 19.7917V21.875C21 22.1513 21.1229 22.4163 21.3417 22.6116C21.5605 22.807 21.8572 22.9167 22.1666 22.9167C22.476 22.9167 22.7728 22.807 22.9916 22.6116C23.2104 22.4163 23.3333 22.1513 23.3333 21.875V19.7917C23.3333 19.5154 23.2104 19.2505 22.9916 19.0551C22.7728 18.8598 22.476 18.75 22.1666 18.75Z"/>
                </svg>
                ${templateSheets[j].sheetName}
            </li>
            `;
        }
        
    }
    addTreeViewFunctionalities();
    addFunctionToTreeViewItems();
}

function addFunctionToTreeViewItems() {
    var goalClass = document.getElementsByClassName('cn-tree-file');
    for(var i = 0; i < goalClass.length; i++) {
        goalClass[i].addEventListener('click', function(){
            clickedConsultItem(this.id);
        }, false);
    }
}

function addTreeViewFunctionalities() {
    var toggler = document.getElementsByClassName('cn-caret');
    for (var i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener('click', function() {
            this.parentElement.querySelector('.cn-nested').classList.toggle('cn-active');
            this.classList.toggle('cn-caret-down');
        });
    }
}

function clickedConsultItem(newItemId) {
    switch (selectedConsultItemId) {  
        case null:
            selectConsultItem(newItemId);
        break;  
        case newItemId:
            resetConsultItem();
        break;   
        default:
            resetConsultItem();
            selectConsultItem(newItemId);
        break;
    }
}

function resetConsultItem() {
    sheetInfoIcon.style.display = 'none';
    document.getElementById(selectedConsultItemId).style.background = '';
    hideInfoArea();
    selectedConsultItemId = null;
    selectedConsultItem = null;
}

function selectConsultItem(id) {
    sheetInfoIcon.style.display = 'block';
    var sheetId = id.split('Consult')[1];
    selectedConsultItemId = id;
    document.getElementById(selectedConsultItemId).style.background = '#29676D';
    for (let index = 0; index < sheetsList.length; index++) {
        if(sheetId === sheetsList[index]._id) {
            selectedConsultItem = sheetsList[index];
        }
    }
    showInfoArea();
}

/** infoarea **/
function hideInfoArea() {
    infoareaTitle.innerHTML = ` `;
    sheetInfo.innerHTML = ` `;
    cnContainer.style.display = 'none';
}

function showInfoArea() {
    infoareaTitle.innerHTML = selectedConsultItem.sheetName;
    sheetInfo.innerHTML = ` `;
    cnContainer.style.display = 'block';
    for (let j = 0; j < selectedConsultItem.features.length; j++) {
        sheetInfo.innerHTML += `
        <div class='sheetInfo-attribute'>${selectedConsultItem.features[j].attribute}<div>
        <hr class='sheetInfo-line'>
        <div class='sheetInfo-value'>${selectedConsultItem.features[j].value}<div>
        `;
        
    }
}

module.exports = {
    initConsultnav: initConsultnav,
    hideInfoArea: hideInfoArea
}