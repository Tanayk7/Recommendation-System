require('dotenv').config();
const jwt = require('jsonwebtoken');
const { policies } = require('../config');

function verifyToken(data) {
    //return jwt.verify(data, process.env.JWT_KEY, policies.auth.TOKEN_EXPIRY);

    return jwt.verify(data, process.env.JWT_KEY);
}

function generateAccessToken(data) {
    //return jwt.sign(data, process.env.JWT_KEY, { expiresIn: policies.auth.TOKEN_EXPIRY });
    return jwt.sign(data, process.env.JWT_KEY);
}

module.exports = { generateAccessToken, verifyToken };