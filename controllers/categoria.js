const { response, request } = require('express');
const { Categoria } = require('../models');

const crearCategoria = async(req = request, res = response) => {
    let { nombre } =  req.body;
    nombre = nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});

    //Verificar si la categoria ya existe
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }
    
    //Generar la Data
    const data = {
        nombre,
        usuario: req.usuario._id,
    };
    const categoria = new Categoria(data);
    //Grabar en BD
    await categoria.save();
    
    return res.json({
        categoria
    });
};

const obtenerCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario','nombre')
    ]);
    
    return res.json({
        total,
        categorias
    });
};

const obtenerCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');

    return res.json({
        categoria
    });
};

const eliminaCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    //Eliminación Física
    //const categoria =  await Categoria.findByIdAndDelete(id)

    //Eliminación lógica
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

    return res.json({
        categoria
    });
};


const actualizaCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})
        .populate('usuario', 'nombre');

    return res.json({ categoria });
};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    eliminaCategoria,
    actualizaCategoria,
};