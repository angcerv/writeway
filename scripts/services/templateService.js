/** CREATE **/
const addNewTemplate = async (name, projId, attributes) => {
    const response = await fetch('http://localhost:3000/templates/create', {
        method: 'POST',
        body: JSON.stringify({templateName: name, projectId: projId, attributes: attributes}), // string or object
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
const deleteTemplate = async (templateId) => {
    const response = await fetch('http://localhost:3000/templates/'+ templateId, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return response.ok;
    
}

const deleteTemplateByProject = async (projectId) => {
    const response = await fetch('http://localhost:3000/templates/deleteByProject/'+ projectId, {
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
const getAllProjectTemplates = async (projectId) => {
    const response = await fetch('http://localhost:3000/templates/'+ projectId);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

const getTemplateById = async (templateId) => {
    const response = await fetch('http://localhost:3000/templates/getOneTemplate/'+ templateId);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
}

/** UPDATE **/
const updateTemplateAttributes = async (templateId, attr) => {
    const response = await fetch('http://localhost:3000/templates/updateAttributes/' + templateId, {
        method: 'PUT',
        body: JSON.stringify({attributes: attr}), // string or object
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

const updateTemplateName = async (templateId, templateName) => {
    const response = await fetch('http://localhost:3000/templates/updateName/' + templateId, {
        method: 'PUT',
        body: JSON.stringify({templateName: templateName}), // string or object
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
    getAllProjectTemplates: getAllProjectTemplates,
    addNewTemplate: addNewTemplate,
    deleteTemplate: deleteTemplate,
    updateTemplateAttributes: updateTemplateAttributes,
    getTemplateById: getTemplateById,
    deleteTemplateByProject: deleteTemplateByProject,
    updateTemplateName: updateTemplateName
}