require("dotenv").config();
const express = require('express');
const BadRequestError = require('../../errors/bad-request-error');

const requireAuth = require('../../middleware/require-auth');
const { currentUser2 } = require('../../middleware/current-user');
const User = require('../../models/user');

const router = express.Router();
const route = '/api/users/get-user-recommendations';
const middlewares = [currentUser2, requireAuth];

router.get(
    route,
    ...middlewares,
    async (req, res, next) => {
        const user = await User.findOne({ _id: req.currentUser.id });

        res.status(200).send(user.recommendations);
    }
)

module.exports = { getUserRecommendationsRouter: router };