const { Router } = require('express')
const { check } = require('express-validator')
const { validateExistsRole, validateExistsEmail, validateUserById } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')
const { 
    obtieneUsuarios, 
    enviaUsuario, 
    patchUsuario, 
    eliminaUsuario, 
    actualizaUsuario } = require('../controllers/user')

const route = Router()

route.get('/', obtieneUsuarios)
route.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({min:6}),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(validateExistsEmail),
    //check('role', 'El Rol no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(validateExistsRole),
    validarCampos,
], enviaUsuario)
route.patch('/', patchUsuario)
route.delete('/:id', [
    check('id', 'No es un Id válidio').isMongoId(),
    check('id').custom(validateUserById),
    validarCampos,
], eliminaUsuario)
route.put('/:id',[
    check('id', 'No es un Id válidio').isMongoId(),
    check('id').custom(validateUserById),
    check('role').custom(validateExistsRole),
    validarCampos,
], actualizaUsuario)

module.exports = route