// =================
//      Puerto
// =================
process.env.PORT = process.env.PORT || 3000;


// =================
//      Entorno
// =================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================
//      Base de Datos
// =================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://mgdb:zZNCRO9y2UKGpcX4@cluster0.1jymx.mongodb.net/cafe';
}
process.env.URL_DB = urlDB;