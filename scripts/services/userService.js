const { ipcRenderer } = require("electron");

/** CREATE **/
const addNewUser = async (userEmail, pwd, uname, aname) => {
    const response = await fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        body: JSON.stringify({email: userEmail, password:pwd, username: uname, authorname: aname}), // string or object
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response

    return response.ok;
}

const logUser = async (userEmail, pwd) => {
    const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        body: JSON.stringify({email: userEmail, password: pwd}), // string or object
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response

    if(response.ok) {
        ipcRenderer.send('goto-projectsList', myJson.token);
        return "Cargando...";
    } else {
        return myJson.message;
    }
}

/** DELETE **/
const deleteUser = async (userId, token) => {
    const response = await fetch('http://localhost:3000/users/'+ userId, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'authorization': token
        }
    });
    await response;
    return response.ok;
}

/** GET **/
const getUserById = async (userId) => {
    const response = await fetch('http://localhost:3000/users/userById/'+userId);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

/** GET **/
const getUserByEmail = async (email) => {
    const response = await fetch('http://localhost:3000/users/userByEmail/'+email);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

/** UPDATE **/
const updateAuthorname = async (id, aname) => {
    console.log(aname)
    const response = await fetch('http://localhost:3000/users/updateAuthorname/'+id, {
        method: 'PUT',
        body: JSON.stringify({authorname: aname}), // string or object
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    if(response.ok) {
        return myJson.token;
    }
}

const updateUsername = async (id, uname) => {
    const response = await fetch('http://localhost:3000/users/updateUsername/'+id, {
        method: 'PUT',
        body: JSON.stringify({username: uname}), // string or object
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    if(response.ok) {
        return myJson.token;
    }
}

const updateUserPass = async (id, pass) => {
    const response = await fetch('http://localhost:3000/users/updatePassword/'+id, {
        method: 'PUT',
        body: JSON.stringify({password: pass}), // string or object
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
    logUser: logUser,
    addNewUser: addNewUser,
    deleteUser: deleteUser,
    updateAuthorname: updateAuthorname,
    updateUsername: updateUsername,
    updateUserPass: updateUserPass,
    getUserById: getUserById,
    getUserByEmail: getUserByEmail
}