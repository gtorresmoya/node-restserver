const { Router } = require('express');
const { check } = require('express-validator');
const { 
    crearCategoria, 
    obtenerCategorias, 
    actualizaCategoria, 
    eliminaCategoria, 
    obtenerCategoria 
} = require('../controllers/categoria');
const { validateCategoriaById } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// Obtener todas las Categorias
router.get('/', obtenerCategorias);

// Obtener una Categoria por Id
router.get('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(validateCategoriaById),
    validarCampos
], obtenerCategoria);

// Crear una Categoria - privado
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

// Actualizar una Categoria por id - privado
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(validateCategoriaById),
    validarCampos
], actualizaCategoria);

// Borrar lógico una Categoria - privado solo Administrador
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(validateCategoriaById),
    validarCampos
], eliminaCategoria);

module.exports = router;