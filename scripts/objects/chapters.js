/** JS FILES **/
const { decodeToken } = require('../utils/tokenOperations'),
    { addNewChapter, getAllProjectChapters, deleteChapter, updateChapterName, updateChapterContent, getChapterById } = require('../../scripts/services/chapterService'),
    { updateAddTask, updateDeleteTask, updateTasks, getTasks } = require('../../scripts/services/projectService'),
    { addAllItemsToList } = require('./manageLists'),
    { resetSelectedTemplate } = require('./templates'),
    { resetSelectedSheet } = require('./sheets'),
    { saveEditorData, setEditorData} = require('../mainWindow/textEditor');

/** CONSTANTS **/
const project = decodeToken(global.location.search.split('=')[1]).project;

/** VARIABLES **/
let chaptersList = null,
    selectedChapterId = null,
    selectedChapter = null,
    tasksList = null;

/** DIVS **/
const chaptersDiv = document.querySelector("#chapters"),
    tasksDiv = document.querySelector("#tasks"),
    writeWorkarea = document.querySelector("#writeWorkarea"),
    templateWorkarea = document.querySelector("#templateWorkarea"),
    sheetWorkarea = document.querySelector("#sheetWorkarea"),
    commentWorkarea = document.querySelector("#commentWorkarea");

/** INPUTS **/
const newChapterInput = document.querySelector('#newChapterInput'),
    newTaskInput = document.querySelector('#newTaskInput'),
    newAssignedInput = document.querySelector('#newAssignedInput');

/** BUTTONS **/
const addChapterBtn = document.querySelector('#addChapterBtn'),
    saveContentBtn = document.querySelector('#aSaveContent'),
    aSettingsExport = document.querySelector('#aSettingsExport'),
    addTaskBtn = document.querySelector('#addTaskBtn');

/** LISTENERS **/
addChapterBtn.addEventListener('click', () => {
    if(newChapterInput.value !== '') {
        createChapter();
    }
})

addTaskBtn.addEventListener('click', () => {
    if(newTaskInput.value !== '') {
        createTask();
    }
})

saveContentBtn.addEventListener('click', () => {
    saveChapterText();
})

newChapterInput.addEventListener('beforeinput', () => {
    if (newChapterInput.value === "") {
        addChapterBtn.disabled = "disabled";
    } else {
        addChapterBtn.disabled = "";
    }
});

/** FUNCTIONS **/
function addAllChapters() {
    addAllItemsToList('chapter', chaptersList, chaptersDiv);
    addFunctionToItemsList();
}

function addFunctionToItemsList() {
    var goalClass = document.getElementsByClassName('wn-chapter-text-toselect');
    for(var i = 0; i < goalClass.length; i++) {
        goalClass[i].addEventListener('click', function(){
            clickedChapter(this.id);
        }, false);
        document.querySelector('#delOptionChapter'+i).addEventListener("click", function(){
            removeChapter(this.id);
          }, false);
    }
}

function clickedChapter(newItemId) {
    var index = newItemId.split('Text')[1];
    newItemId = 'chapterToColorText'+index;
    switch (selectedChapterId) {  
        case null:
            selectChapter(newItemId);
        break;  
        case newItemId:
            hideChapterInWorkArea();
            resetSelectedChapter();
        break;   
        default:
            resetSelectedChapter();
            selectChapter(newItemId);
        break;
    }
}

async function createChapter() {
    await addNewChapter(newChapterInput.value, project._id, '');
    chaptersList = await getAllProjectChapters(project._id);
    addAllChapters();

    newChapterInput.value = '';
}

async function initWriteCategory() {
    chaptersList = await getAllProjectChapters(project._id);
    addAllChapters();
    addAllTasks();
}

function removeChapter(id) {
    var index = id.split('Chapter')[1];
    var chapterToDelete = chaptersList[index];
    deleteChapter(chapterToDelete._id);  
    if(selectedChapter !== null) {
        resetSelectedChapter();
    }
    chaptersList.splice(index,1);
    addAllChapters();
}

async function resetSelectedChapter() {
    document.getElementById(selectedChapterId).style.background = '';
    // hideChapterInWorkArea();
    selectedChapterId = null;
    selectedChapter = null;
}

async function saveChapterText() {
    saveEditorData(selectedChapter._id);
}

async function selectChapter(itemId) {
    var index = itemId.split('Text')[1];
    selectedChapterId = itemId;
    document.getElementById(selectedChapterId).style.background = '#29676D';  
    selectedChapter = await getChapterById(chaptersList[index]._id);
    showChapterInWorkArea();
}

/** workarea **/
function showChapterInWorkArea() {
    if(templateWorkarea.style.display === 'block') {
        resetSelectedTemplate();
    }
    if(sheetWorkarea.style.display === 'block') {
        resetSelectedSheet();
    }
    if(commentWorkarea.style.display === 'block') {
        commentWorkarea.style.display = 'none';
        document.querySelector("#aCommentsIcon").style.fill = '';
    }
    writeWorkarea.style.display = 'block';
    saveContentBtn.style.display = 'block';
    // aSettingsExport.style.display = 'block';
    setEditorData(selectedChapter.content);
}

function hideChapterInWorkArea() {
    saveChapterText();
    writeWorkarea.style.display = 'none';
    saveContentBtn.style.display = 'none';
    // aSettingsExport.style.display = 'none';
}

// TASKS

async function addAllTasks() {
    projectUdated = await getTasks(project._id);
    tasksList = projectUdated.tasks;
    addAllItemsToList('task', tasksList, tasksDiv);
    addFunctionToTasksList();
}

function addFunctionToTasksList() {
    var goalClass = document.getElementsByClassName('wn-task-text');
    for(var i = 0; i < goalClass.length; i++) {
        goalClass[i].addEventListener('click', function(){
            clickedTask(this.id);
        }, false);
        document.querySelector('#delOptionTask'+i).addEventListener("click", function(){
            removeTask(this.id);
          }, false);
    }
}

async function clickedTask(taskDivId) {
    var index = taskDivId.split('Text')[1];
    if(tasksList[index].done) {
        document.getElementById('taskText'+index).style.textDecoration = "none";
        tasksList[index].done = false;
    } else {
        document.getElementById('taskText'+index).style.textDecoration = "line-through";
        tasksList[index].done = true;
    }
    await updateTasks(project._id, tasksList);
    
}

async function createTask() {
    if(newAssignedInput.value === '') {
        currentAssigned = 'sin asignar';
    } else {
        currentAssigned = newAssignedInput.value;
    }
    newTask = {text: newTaskInput.value, done: false, assigned: currentAssigned};
    await updateAddTask(project._id, newTask);
    addAllTasks();

    newTaskInput.value = '';
    newAssignedInput.value = '';
}

async function removeTask(taskDivId) {
    var index = taskDivId.split('Task')[1];
    updateDeleteTask(project._id, tasksList[index]);  
    addAllTasks();
}

module.exports = {
    initWriteCategory: initWriteCategory,
    resetSelectedChapter: resetSelectedChapter
}