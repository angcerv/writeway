/** CREATE **/
const addNewProject = async (name, user, shareUsers) => {
    const response = await fetch('http://localhost:3000/projects/create', {
        method: 'POST',
        body: JSON.stringify({projectName: name, userId: user, shareUsers: shareUsers}), // string or object
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
const deleteProject = async (projectId) => {
    const response = await fetch('http://localhost:3000/projects/'+ projectId, {
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
const getAllUserProjects = async (userId) => {
    const response = await fetch('http://localhost:3000/projects/'+ userId);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

const getProjectById = async (projectId) => {
    const response = await fetch('http://localhost:3000/projects/openProject/'+ projectId);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

const getTasks = async (projectId) => {
    const response = await fetch('http://localhost:3000/projects/getTasks/'+ projectId);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

/** UPDATE **/
const updateLastModifiedProject = async (projectId, date) => {
    const response = await fetch('http://localhost:3000/projects/updateDate/'+ projectId, {
        method: 'PUT',
        body: JSON.stringify({lastModified: date}), // string or object
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

/** UPDATE **/
const updateAddShareUser = async (projectId, newUserId) => {
    const response = await fetch('http://localhost:3000/projects/addShareUser/'+ projectId, {
        method: 'PUT',
        body: JSON.stringify({newUserId: newUserId}), // string or object
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

/** UPDATE **/
const updateDeleteShareUser = async (projectId, userToRemove) => {
    const response = await fetch('http://localhost:3000/projects/deleteShareUser/'+ projectId, {
        method: 'PUT',
        body: JSON.stringify({userToRemove: userToRemove}), // string or object
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

/** UPDATE **/
const updateAddTask = async (projectId, newTask) => {
    const response = await fetch('http://localhost:3000/projects/addTask/'+ projectId, {
        method: 'PUT',
        body: JSON.stringify({newTask: newTask}), // string or object
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

/** UPDATE **/
const updateDeleteTask = async (projectId, taskToRemove) => {
    const response = await fetch('http://localhost:3000/projects/deleteTask/'+ projectId, {
        method: 'PUT',
        body: JSON.stringify({taskToRemove: taskToRemove}), // string or object
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

/** UPDATE **/
const updateTasks = async (projectId, tasks) => {
    const response = await fetch('http://localhost:3000/projects/updateTasks/'+ projectId, {
        method: 'PUT',
        body: JSON.stringify({tasks: tasks}), // string or object
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
    getAllUserProjects: getAllUserProjects,
    deleteProject: deleteProject,
    addNewProject: addNewProject,
    getProjectById: getProjectById,
    updateLastModifiedProject: updateLastModifiedProject,
    updateAddShareUser: updateAddShareUser,
    updateDeleteShareUser: updateDeleteShareUser,
    updateAddTask: updateAddTask,
    updateDeleteTask: updateDeleteTask,
    updateTasks: updateTasks,
    getTasks: getTasks
}