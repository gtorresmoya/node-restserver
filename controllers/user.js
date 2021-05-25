
const { response , request} = require('express')

const obtieneUsuarios = (req = request, res = response) => {
    const query = req.query;
    res.json({
        desc: 'GET Method',
        query
    })
}

const enviaUsuario = (req = request, res = response) => {
    const { name, age } = req.body
    res.json({
        desc: 'POST Method',
        name,
        age
    })
}

const patchUsuario = (req = request, res = response) => {
    res.json({
        desc: 'PATCH Method'
    })
}

const eliminaUsuario = (req = request, res = response) => {
    res.json({
        desc: 'DELETE Method'
    })
}

const actualizaUsuario = (req = request, res = response) => {
    const id = req.params.id
    res.json({
        desc: 'PUT Method',
        id
    })
}

module.exports = {
    obtieneUsuarios,
    enviaUsuario,
    patchUsuario,
    eliminaUsuario,
    actualizaUsuario
}