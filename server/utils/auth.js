require('dotenv').config();
const jwt = require('jsonwebtoken');
const { policies } = require('../config');

function verifyToken(data) {
    return jwt.verify(data, process.env.JWT_KEY, policies.auth.TOKEN_EXPIRY);
}

function generateAccessToken(data) {
    return jwt.sign(data, process.env.JWT_KEY, { expiresIn: policies.auth.TOKEN_EXPIRY });
}

module.exports = { generateAccessToken, verifyToken };