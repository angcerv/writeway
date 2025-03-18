function checkEmptyInput(input) {
    if (input === "") {
        return true;
    } else {
        return false;
    }
}

function checkEmptyForm(inputs) {
    var isEmpty = false;
    for (let i = 0; i < inputs.length; i++) {
        if(checkEmptyInput(inputs[i])) {
            isEmpty = true;
            break;
        }
    }
    return isEmpty;
}

function compareInputs(input1, input2) {
    if (input1 === input2) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    checkEmptyInput: checkEmptyInput,
    checkEmptyForm: checkEmptyForm,
    compareInputs: compareInputs
};