/** CREATE **/
const addNewChapter = async (name, projId, content) => {
    const response = await fetch('http://localhost:3000/chapters/create', {
        method: 'POST',
        body: JSON.stringify({chapterName: name, projectId: projId, content: content}), // string or object
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
const deleteChapter = async (chapterId) => {
    const response = await fetch('http://localhost:3000/chapters/'+ chapterId, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return response.ok;
    
}

/** DELETE **/
const deleteChapterByProject = async (projectId) => {
    const response = await fetch('http://localhost:3000/chapters/deleteByProject/'+ projectId, {
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
const getAllProjectChapters = async (projectId) => {
    const response = await fetch('http://localhost:3000/chapters/getByProject/'+ projectId);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

/** GET **/
const getChapterById = async (chapterId) => {
    const response = await fetch('http://localhost:3000/chapters/getById/'+ chapterId);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

/** UPDATE **/
const updateChapterName = async (chapterId, chapterName) => {
    const response = await fetch('http://localhost:3000/chapters/updateName/' + chapterId, {
        method: 'PUT',
        body: JSON.stringify({chapterName: chapterName}), // string or object
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

const updateChapterContent = async (chapterId, chapterContent) => {
    const response = await fetch('http://localhost:3000/chapters/updateContent/' + chapterId, {
        method: 'PUT',
        body: JSON.stringify({content: chapterContent}), // string or object
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

module.exports = {
    addNewChapter: addNewChapter,
    getAllProjectChapters: getAllProjectChapters,
    deleteChapter: deleteChapter,
    deleteChapterByProject: deleteChapterByProject,
    updateChapterName: updateChapterName,
    updateChapterContent: updateChapterContent,
    getChapterById: getChapterById
}