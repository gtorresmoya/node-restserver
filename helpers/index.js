
const GeneraJWT = require('./jwt');
const GoogleVerify = require('./google-verify');
const SubirArchivo = require('./upload-file');
const ValidacionesDB = require('./db-validators');

module.exports = {
    ...GeneraJWT,
    ...GoogleVerify,
    ...SubirArchivo,
    ...ValidacionesDB,
};