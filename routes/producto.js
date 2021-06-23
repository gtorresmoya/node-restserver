const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProducto, obtenerProductos, crearProducto, actualizaProducto, eliminaProducto } = require('../controllers/producto');
const { validateProductoById, validateCategoriaById } = require('../helpers/db-validators');
const { validarCampos, esAdminRole, validarJWT } = require('../middlewares');

const router = Router();

// Obtener todas las Productos
router.get('/', obtenerProductos);

// Obtener una Producto por Id
router.get('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(validateProductoById),
    validarCampos
], obtenerProducto);

// Crear una Producto - privado
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un Id válido').isMongoId(),
    check('categoria').custom(validateCategoriaById),
    validarCampos
],crearProducto);

// Actualizar una Producto por id - privado
router.put('/:id', [
    validarJWT,
    check('id').custom(validateProductoById),
    check('categoria', 'No es un Id válido').isMongoId(),
    check('categoria').custom(validateCategoriaById),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizaProducto);

// Borrar lógico una Producto - privado solo Administrador
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(validateProductoById),
    validarCampos
], eliminaProducto);

module.exports = router;