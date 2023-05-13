const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');

function decryptPassword({ salt, hash, token }, password) {
    const toCompareHash = SHA256(salt + password).toString(encBase64);

    if (hash === toCompareHash) {
        return { token };
    }

    return "mot de passe invalide";
}

module.exports = decryptPassword;