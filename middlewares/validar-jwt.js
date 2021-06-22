const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(400).json({
            msg: 'NO hay token en la perición'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPUBLICKEY);
        //Leer el usuario que corresponde al UID
        const usuario =  await Usuario.findById(uid);

        //Verificar si el usuario existe
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        //Verificar si el usuario no esta borrado
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token inválido'
        });
    }
};

module.exports = {
    validarJWT
};