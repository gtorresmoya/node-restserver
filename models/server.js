const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios',
        };

        //Conexion a DB
        this.connectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de la applicacion
        this.routes();
    }

    async connectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        
        //Lectura y Parseo del Body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));

        //Directorio Temporal para Uploads
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categoria'));
        this.app.use(this.paths.productos, require('../routes/producto'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor sirviendo en el puerto ${this.port}`);
        });
    }
}
module.exports = Server;