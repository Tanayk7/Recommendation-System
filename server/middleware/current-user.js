const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/auth');

const currentUser = (req, res, next) => {
    if (!req.session.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentUser = payload;
    }
    catch (err) { }

    next();
}

const currentUser2 = (req, res, next) => {
    console.log("request headers: ", req.headers);

    if (!req.headers['authorization']) {
        console.log("Authorization header not present!");
        return next();
    }

    try {
        const token = req.headers['authorization'].split(' ')[1];
        const payload = verifyToken(token);

        console.log("Token: ", token);
        console.log("Verified payload: ", payload);

        req.currentUser = payload;
    }
    catch (err) { }

    next();
}

module.exports = { currentUser, currentUser2 };