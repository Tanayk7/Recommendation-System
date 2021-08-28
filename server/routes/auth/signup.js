require('dotenv').config();
const express = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');

const validateRequest = require('../../middleware/validateRequest');
const BadRequestError = require('../../errors/bad-request-error');
const { policies } = require('../../config');
const User = require('../../models/user');
const { generateAccessToken } = require('../../utils/auth');

const router = express.Router();
const route = '/api/users/signup';
const validation_rules = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({
        min: policies.password.MIN_CHARS,
        max: policies.password.MAX_CHARS
    }),
];
const middlewares = [...validation_rules, validateRequest];

router.post(
    route,
    ...middlewares,
    async (req, res, next) => {
        const { email, password } = req.body;
        const user_exists = await User.findOne({ email });

        if (user_exists) {
            return next(new BadRequestError("Email is in use"));
        }

        const user = User.build({ email, password });
        await user.save();

        const userJWT = generateAccessToken({ id: user.id, email: user.email });

        res.status(201).send({
            user,
            token: userJWT
        });
    }
);

module.exports = { signupRouter: router };