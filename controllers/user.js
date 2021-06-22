const { response , request } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');;

const obtieneUsuarios = async(req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query
    const query = {estado:true}

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    })
}

const enviaUsuario = async(req = request, res = response) => {
    const { nombre, correo, password,role } = req.body
    const usuario = new Usuario({nombre, correo, password, role})

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password,salt)

    //Grabar usuario
    await usuario.save()

    res.json({
        desc: 'POST Method',
        usuario
    })
}

const patchUsuario = (req = request, res = response) => {
    const {id} = req.params
    res.json({
        desc: 'PATCH Method'
    })
}

const eliminaUsuario = async(req = request, res = response) => {
    const {id} = req.params
    //Eliminación Física
    //const usuario =  await Usuario.findByIdAndDelete(id)

    //Eliminación lógica
    const usuario =  await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({
        usuario
    })
}

const actualizaUsuario = async(req = request, res = response) => {
    const {id} = req.params
    const {_id, password, google, ...resto} = req.body

    if(password){
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password,salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)
}

module.exports = {
    obtieneUsuarios,
    enviaUsuario,
    patchUsuario,
    eliminaUsuario,
    actualizaUsuario
}