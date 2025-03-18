/** STRING - DELETE spaces in a string **/
function deleteStrSpaces(str) {
    str = str.split(" ").join("");
    return str;
}

function getCurrentDate() {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;
	return today;
}

module.exports = {
    getCurrentDate: getCurrentDate,
	deleteStrSpaces: deleteStrSpaces
};