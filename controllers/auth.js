const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/jwt');

const loginController = async(req, resp = response) => {
    const {correo, password} = req.body;
    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return resp.status(400).json({
                msg: 'Usuario / Password son incorrectos'
            });
        }

        //Verificar si el usuario está activo en la BD
        if(!usuario.estado){
            return resp.status(400).json({
                msg: 'Usuario / Password son incorrectos'
            });
        }

        // Verificar si la contraseña esta ok
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return resp.status(400).json({
                msg: 'Usuario / Password son incorrectos'
            });
        }

        //Generar JWT
        const token = await generaJWT(usuario.id);

        resp.json({
            usuario,
            token
        });        
    } catch (error) {
        resp.status(500).json({
            msg:'Hable con el administrador'
        });
    }
};

module.exports = {
    loginController,
};