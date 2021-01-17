// =================
//  Puerto
// =================
process.env.PORT = process.env.PORT || 3000;


// =================
//  Entorno
// =================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================
//  Base de Datos
// =================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URL_DB = urlDB;

// ===================
//  JWT Seed ( Semilla )
// ===================
process.env.SEED = process.env.SEED || 'secret-dev';

// ===================
//  Vencimiento JWT
// ===================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ==================
// Google ClientID
// ==================
process.env.CLIENT_ID = process.env.CLIENT_ID || '971557626261-neskvaei3danp9k6fahnuo5c6m8pha2g.apps.googleusercontent.com';