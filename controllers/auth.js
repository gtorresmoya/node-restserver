const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/jwt');
const { json } = require('body-parser');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignin = async(req, resp = response) => {
    const {id_token} = req.body;
    try {
        const { nombre, img, correo} = await googleVerify(id_token);
        let usuario = await Usuario.findOne({correo});
        if(!usuario){
            //Se debe crear el Usuario
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google:true
            };
            usuario = new Usuario(data);
            usuario.save();
        }
        //Si el Usuario de Base de Datos esta bloqueado
        if(!usuario.estado){
            return resp.status(400).json({
                msg: 'Hable con el administrador, usuario bloqueado.!'
            });
        }

        //Generar el JWT
        const token = await generaJWT(usuario.id);

        return resp.json({
            usuario,
            token
        }); 
    } catch (error) {
        resp.status(400).json({
            msg: 'Token de Google no válido'
        });
    }
};

module.exports = {
    loginController,
    googleSignin,
};