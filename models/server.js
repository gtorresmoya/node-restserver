const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        //Middlewares
        this.middlewares()

        //Rutas de la applicacion
        this.routes()
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