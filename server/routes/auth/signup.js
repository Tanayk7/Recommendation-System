require('dotenv').config();
const express = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const validateRequest = require('../../middleware/validateRequest');
const BadRequestError = require('../../errors/bad-request-error');
const { password_policy } = require('../../config');
const User = require('../../models/user');

const router = express.Router();
const route = '/api/users/signup';
const validation_rules = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({
        min: password_policy.MIN_CHARS,
        max: password_policy.MAX_CHARS
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

        const userJWT = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_KEY
        );

        req.session = { jwt: userJWT };
        res.status(201).send(user);
    }
);

module.exports = { signupRouter: router };