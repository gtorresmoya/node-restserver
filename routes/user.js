const { Router } = require('express');
const { 
    obtieneUsuarios, 
    enviaUsuario, 
    patchUsuario, 
    eliminaUsuario, 
    actualizaUsuario } = require('../controllers/user');

const route = Router();

route.get('/', obtieneUsuarios)
route.post('/', enviaUsuario)
route.patch('/', patchUsuario)
route.delete('/', eliminaUsuario)
route.put('/:id', actualizaUsuario)

module.exports = route