const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivos = async(req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivo que subir.' });
        return;
    }

    try {
        const nombre =  await subirArchivo(req.files, ['txt', 'md'], 'textos');
        res.json({
            nombre,
        });
    } catch (error) {
        res.status(400).json({
            msg: error
        });
    }
};

const actualizarImagen = async(req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
    
        default:
            res.status(500).json({
                msg: 'Se me olvido validar esto'
            });
            break;
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();
    return res.json({
        modelo
    });
};

module.exports = {
    cargarArchivos,
    actualizarImagen,
};