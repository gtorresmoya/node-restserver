const path = require('path');
const fs = require('fs');

const { v4 : uuidv4 } = require('uuid');

const subirArchivo = (files, extensionValidas = ['jpeg', 'jpg', 'png', 'bmp', 'gif'], carpeta = '')=>{
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nomCortado = archivo.name.split('.');
        const extension = nomCortado[nomCortado.length -1];
    
        if(!extensionValidas.includes(extension)){
            return reject(`La extensión ${extension} no está permitida. Extensiones válidas son: ${extensionValidas}`);
        }
    
        const nomTempArchivo = `${uuidv4()}.${extension}`;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nomTempArchivo);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            let buff = fs.readFileSync(uploadPath);
            //Borrar imagen temporal del servidor
            if(fs.existsSync(uploadPath)){
                fs.unlinkSync(uploadPath);
            }
            return resolve(buff.toString('base64'));
        });
    });
};

module.exports = {
    subirArchivo,
};