/** CREATE **/
const addNewComment = async (author, message, projId, date) => {
    const response = await fetch('http://localhost:3000/comments/create', {
        method: 'POST',
        body: JSON.stringify({commentAuthor: author, commentMessage: message, projectId: projId, date: date}), // string or object
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    if(response.ok) {
        return myJson;
    }
}

/** DELETE **/
const deleteComment = async (commentId) => {
    const response = await fetch('http://localhost:3000/comments/deleteComment/'+ commentId, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return response.ok;  
}

/** GET **/
const getAllProjectComments = async (projectId) => {
    const response = await fetch('http://localhost:3000/comments/getByProject/'+ projectId);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

module.exports = {
    getAllProjectComments: getAllProjectComments,
    addNewComment: addNewComment,
    deleteComment: deleteComment
}