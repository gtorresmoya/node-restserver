require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// habilitacion carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//Configuración Global de rutas
app.use(require('./routes/index'));

mongoose.connect(
    process.env.URL_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err, res) => {
        if (err) throw err;
        console.log('DataBase ONLINE');
    }
);

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto', process.env.PORT);
});