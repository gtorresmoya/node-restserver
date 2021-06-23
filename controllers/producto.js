const { response, request } = require('express');
const { Producto } = require('../models');

const crearProducto = async(req = request, res = response) => {
    let { estado, usuario, ...body } =  req.body;
    const productoDB = await Producto.findOne({nombre});
 
    //Verificar si el Producto ya existe
    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    //Generar la Data
    const data = {
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
        ...body
    };
    const producto = new Producto(data);
    //Grabar en BD
    await producto.save();
    
    return res.status(201).json({
        producto
    });
};

const obtenerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);
    
    return res.json({
        total,
        productos
    });
};

const obtenerProducto = async (req = request, res = response) => {
    const { id } = req.params;
    
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    return res.json({
        producto
    });
};

const eliminaProducto = async (req = request, res = response) => {
    const { id } = req.params;
    //Eliminación Física
    //const producto =  await Producto.findByIdAndDelete(id)

    //Eliminación lógica
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: false});

    return res.json({
        producto
    });
};

const actualizaProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;
    
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    return res.json({ producto });
};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    eliminaProducto,
    actualizaProducto,
};