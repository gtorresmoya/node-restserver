const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivos, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoUpload } = require('../middlewares');

const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos,
],mostrarImagen);

router.post('/', validarArchivoUpload, cargarArchivos);

router.put('/:coleccion/:id', [
    validarArchivoUpload,
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos,
], actualizarImagen);

module.exports = router;