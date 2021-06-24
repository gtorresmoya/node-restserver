const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Categoria, Producto, Usuario, Role } = require("../models");
const usuario = require("../models/usuario");

const colecionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
];

const buscar = async (req = request, res = response) => {
    const { coleccion, termino } = req.params;

    if (!colecionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg: `Las colecciones permitidas son: ${colecionesPermitidas}`
        });
    }

    let resultado;
    const nombre = termino.toUpperCase();

    switch (coleccion) {
        case 'categorias':
            buscarCategoria(termino, res);
            break;
        case 'productos':
            buscarProducto(termino, res);
            break;
        case 'roles':
            resultado = await Role.findOne({ nombre });
            break;
        case 'usuarios':
            buscarUsuario(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            });
            break;
    }
};

const buscarUsuario = async (termino = '', res = response) => {
    const isMongoID = isValidObjectId(termino);
    const regexp = new RegExp(termino, 'i');

    if (isMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            result: (usuario) ? [usuario] : []
        });
    }
    const usuarios = await Usuario.find({
        $or: [{ nombre: regexp }, { correo: regexp }],
        $and: [{ estado: true }]
    });
    res.json({
        result: (usuarios) ? usuarios : []
    });
};

const buscarProducto = async (termino = '', res = response) => {
    const isMongoID = isValidObjectId(termino);
    const regexp = new RegExp(termino, 'i');
    if (isMongoID) {
        const producto = await Producto.findById(termino)
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre');
        return res.json({
            result: (producto) ? [producto] : []
        });
    }

    const productos = await Producto.find({
        $or: [{ nombre: regexp }],
        $and: [{ estado: true }]
    })
    .populate('categoria', 'nombre')
    .populate('usuario', 'nombre');

    res.json({
        result: (productos) ? productos : []
    });
};

const buscarCategoria = async (termino = '', res = response) => {
    const isMongoID = isValidObjectId(termino);
    const regexp = new RegExp(termino, 'i');
    if (isMongoID) {
        const categoria = await Categoria.findById(termino)
            .populate('usuario', 'nombre');
        return res.json({
            result: (categoria) ? [categoria] : []
        });
    }

    const categorias = await Categoria.find({
        $or: [{ nombre: regexp }],
        $and: [{ estado: true }]
    })
    .populate('usuario', 'nombre');
    
    res.json({
        result: (categorias) ? categorias : []
    });
};

module.exports = {
    buscar,
};