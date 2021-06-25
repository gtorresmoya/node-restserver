
const validarCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const validaRoles = require('./validar-role');
const validarArchivoUpload = require('./validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivoUpload,
};