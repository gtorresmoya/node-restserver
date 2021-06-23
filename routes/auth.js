const { Router } = require('express');
const { check } = require('express-validator');

const { loginController, googleSignin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos,
],
loginController);

router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos,
],
googleSignin);

module.exports = router;