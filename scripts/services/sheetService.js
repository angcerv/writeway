/** CREATE **/
const addNewSheet = async (name, projectId, templateId, features) => {
    const response = await fetch('http://localhost:3000/sheets/create', {
        method: 'POST',
        body: JSON.stringify({sheetName: name, projectId: projectId, templateId: templateId, features: features}), // string or object
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
const deleteSheet = async (sheetId) => {
    const response = await fetch('http://localhost:3000/sheets/'+ sheetId, {
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
const deleteSheetByProject = async (projectId) => {
    const response = await fetch('http://localhost:3000/sheets/deleteByProject/'+ projectId, {
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
const getAllProjectSheets = async (projectId) => {
    const response = await fetch('http://localhost:3000/sheets/sheetsByProject/'+ projectId);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

const getAllTemplateSheets = async (templateId) => {
    const response = await fetch('http://localhost:3000/sheets/sheetsByTemplate/'+ templateId);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

/** UPDATE **/
const updateSheetFeatures = async (sheetId, features) => {
    const response = await fetch('http://localhost:3000/sheets/updateFeatures/' + sheetId, {
        method: 'PUT',
        body: JSON.stringify({ features: features }), // string or object
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

const updateSheetName = async (sheetId, sheetName) => {
    const response = await fetch('http://localhost:3000/sheets/updateName/' + sheetId, {
        method: 'PUT',
        body: JSON.stringify({ sheetName: sheetName }), // string or object
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

const updateSheetsAddAtribute = async (templateId, newAttribute) => {
    const response = await fetch('http://localhost:3000/sheets/addAttribute/' + templateId, {
        method: 'PUT',
        body: JSON.stringify({ newAttribute: newAttribute }), // string or object
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

const updateSheetsRemoveAtribute = async (templateId, attributeToDelete) => {
    const response = await fetch('http://localhost:3000/sheets/removeAttribute/' + templateId, {
        method: 'PUT',
        body: JSON.stringify({ attributeToDelete: attributeToDelete }), // string or object
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
    addNewSheet: addNewSheet,
    getAllProjectSheets: getAllProjectSheets,
    deleteSheet: deleteSheet,
    updateSheetFeatures: updateSheetFeatures,
    updateSheetName: updateSheetName,
    updateSheetsAddAtribute: updateSheetsAddAtribute,
    updateSheetsRemoveAtribute: updateSheetsRemoveAtribute,
    getAllTemplateSheets: getAllTemplateSheets,
    deleteSheetByProject: deleteSheetByProject
}