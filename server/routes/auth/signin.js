const express = require('express');
const { body } = require('express-validator');

const { generateAccessToken } = require('../../utils/auth');
const validateRequest = require('../../middleware/validateRequest');
const BadRequestError = require('../../errors/bad-request-error');
const User = require('../../models/user');
const Password = require('../../utils/password');

const router = express.Router();
const route = '/api/users/signin';
const validation_rules = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
];
const middlewares = [...validation_rules, validateRequest];


router.post(
    route,
    ...middlewares,
    async (req, res, next) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return next(new BadRequestError("Invalid credentials"));
        }

        const passwordMatch = await Password.compare(existingUser.password, password);

        if (!passwordMatch) {
            return next(new BadRequestError("Invalid credentials"));
        }

        const userJWT = generateAccessToken(
            {
                id: existingUser.id,
                email: existingUser.email,
                name: existingUser.name
            },
        );

        res.status(200).send({
            user: existingUser,
            token: userJWT
        });
    }
);

module.exports = { signinRouter: router };