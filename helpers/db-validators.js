const { Categoria, Role, Usuario, Producto } = require('../models');

const validateExistsRole = async(role = '') => {
    const existRole = await Role.findOne({role});
    if( !existRole ){
        throw new Error(`El Rol ${role} no está registrado en la Base de Datos!`);
    }
};

const validateExistsEmail = async(correo = null) => {
    const existsEmail = await Usuario.findOne({correo});
    if(existsEmail){
        throw new Error(`El correo ${correo} ya está registrado en la Base de Datos!`);
    }
};

const validateUserById = async(id) => {
    const existsUserId = await Usuario.findById(id);
    if(!existsUserId){
        throw new Error(`El id ${id} no existe en la Base de Datos!`);
    }
};

const validateCategoriaById = async(id) => {
    const existsCategoriaId = await Categoria.findById(id);
    if(!existsCategoriaId){
        throw new Error(`El id ${id} no existe en la Base de Datos!`);
    }
};

const validateProductoById = async(id) => {
    const existsProductoId = await Producto.findById(id);
    if(!existsProductoId){
        throw new Error(`El id ${id} no existe en la Base de Datos!`);
    }
};

module.exports = {
    validateExistsRole,
    validateExistsEmail,
    validateUserById,
    validateCategoriaById,
    validateProductoById,
};