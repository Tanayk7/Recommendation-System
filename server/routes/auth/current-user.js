const express = require('express');

const { currentUser2 } = require('../../middleware/current-user');

const router = express.Router();

const route = '/api/users/currentUser';
const middlewares = [currentUser2];

router.get(
    route,
    ...middlewares,
    (req, res) => {
        res.send({ currentUser: req.currentUser || null });
    }
);

module.exports = { currentUserRouter: router };