/** JS FILES **/
const { addAllItemsToList } = require('./manageLists'),
    { updateSheetFeatures } = require('../../scripts/services/sheetService');

/** VARIABLES **/
let selectedSheet = null;

/** DIVS **/
const featuresDiv = document.querySelector('#features');

/** FUNCTIONS **/
async function addSheetFeatures(sheet) { 
    selectedSheet = sheet;
    featuresDiv.innerHTML = '';
    addAllItemsToList('feature', selectedSheet.features, featuresDiv);
}

function saveFeatures() {
    for (let i = 0; i < selectedSheet.features.length; i++) {
        var featureTextareaId = 'sheetFeatureValue'+i;
        selectedSheet.features[i].value = document.getElementById(featureTextareaId).value;
    }
    updateSheetFeatures(selectedSheet._id, selectedSheet.features);
}

module.exports = {
    addSheetFeatures: addSheetFeatures,
    saveFeatures: saveFeatures
}