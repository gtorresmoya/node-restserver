const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        //Conexion a DB
        this.connectarDB()

        //Middlewares
        this.middlewares()

        //Rutas de la applicacion
        this.routes()
    }

    async connectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        
        //Lectura y Parseo del Body
        this.app.use(express.json())

        //Directorio Publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use('/api/usuarios', require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor sirviendo en el puerto ${this.port}`)
        })
    }
}
module.exports = Server