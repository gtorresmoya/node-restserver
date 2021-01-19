const express = require('express');
const _ = require('underscore');
let { verificaToken, verificaAdminRole } = require('../middlewares/authentication');

const app = express();

let Producto = require('../models/producto');



module.exports = app;