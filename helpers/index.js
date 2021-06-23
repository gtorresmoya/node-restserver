
const GeneraJWT = require('../helpers/jwt');
const GoogleVerify = require('../helpers/google-verify');

module.exports = {
    ...GeneraJWT,
    ...GoogleVerify
};