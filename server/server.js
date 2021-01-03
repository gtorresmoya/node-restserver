require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/usuario', function(req, res) {
    res.json('Get Usuario');
});

app.post('/usuario', jsonParser, function(req, res) {
    if (req.body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        const body = req.body;
        res.json({
            persona: body
        });
    }
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json(`Put Usuario : ${ id }`);
});
app.delete('/usuario', function(req, res) {
    res.json('Delete Usuario');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto', process.env.PORT);
});