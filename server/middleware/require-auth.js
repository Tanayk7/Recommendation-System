const NotAuthorizedError = require("../errors/not-authorized-error")
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }

    next();
};

module.exports = requireAuth;