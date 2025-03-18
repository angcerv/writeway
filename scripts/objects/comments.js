/** JS FILES **/
const { decodeToken } = require('../utils/tokenOperations'),
    { getAllProjectComments, addNewComment, deleteComment } = require('../../scripts/services/commentService'),
    { addAllItemsToList } = require('./manageLists');

/** CONSTANTS **/
const project = decodeToken(global.location.search.split('=')[1]).project,
    userToken = decodeToken(global.location.search.split('=')[1]).userToken,
    userLogged = decodeToken(userToken);

/** VARIABLES **/
let commentsList = null;

/** BOOLEANS **/
let commentsWorkareaIsShowed = false;

/** DIVS **/
const commentsDiv = document.querySelector("#comments"),
    writeWorkarea = document.querySelector("#writeWorkarea"),
    templateWorkarea = document.querySelector("#templateWorkarea"),
    sheetWorkarea = document.querySelector("#sheetWorkarea"),
    commentWorkarea = document.querySelector("#commentWorkarea");

/** INPUTS **/
const newCommentInput = document.querySelector('#newCommentInput');

/** BUTTONS **/
const addCommentBtn = document.querySelector('#addCommentBtn'),
    commentsIcon = document.querySelector('#aCommentsIcon');

/** LISTENERS **/
addCommentBtn.addEventListener('click', () => {
    if(newCommentInput.value !== '') {
        createComment();
    }
})

commentsIcon.addEventListener('click', () => {
    if(commentsWorkareaIsShowed) {
        hideCommentsInWorkArea();
    } else {
        showCommentsInWorkArea();
    }
})


/** FUNCTIONS **/
function addAllComments() {
    getAllProjectComments(project._id)
    .then(result => {
        commentsList = result;
        addAllItemsToList('comment', commentsList, commentsDiv);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

async function createComment() {
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " - "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes();
    await addNewComment(userLogged.authorname, newCommentInput.value, project._id, datetime);
    addAllComments();
    newCommentInput.value = "";
}

function initCommentsCategory() {
    addAllComments();
}

/** workarea **/
function hideCommentsInWorkArea() {
    commentWorkarea.style.display = 'none';
    commentsIcon.style.fill = '';
    commentsWorkareaIsShowed = false;
}

function showCommentsInWorkArea() {
    if(sheetWorkarea.style.display === 'block') {
        sheetWorkarea.style.display = 'none';
    }
    if(writeWorkarea.style.display === 'block') {
        writeWorkarea.style.display = 'none';
    }
    if(templateWorkarea.style.display === 'block') {
        templateWorkarea.style.display = 'none';
    }
    commentWorkarea.style.display = 'block';
    commentsIcon.style.fill = '#3F888F';
    commentsWorkareaIsShowed = true;
}

module.exports = {
    initCommentsCategory: initCommentsCategory
}