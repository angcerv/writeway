const jwt = require('jsonwebtoken'),
    KEY = 'sssh';

function decodeToken(token) {
    return jwt.verify(token, KEY);
}

module.exports = {
    decodeToken: decodeToken
}