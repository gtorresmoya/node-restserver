const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivos, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/', cargarArchivos);

router.put('/:coleccion/:id', [
    check('id', 'EL id debe ser de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos,
],actualizarImagen);

module.exports = router;