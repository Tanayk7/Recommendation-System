require('dotenv').config();
const express = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');

const { randRange } = require('../../utils/math');
const { generateAccessToken } = require('../../utils/auth');
const validateRequest = require('../../middleware/validateRequest');
const BadRequestError = require('../../errors/bad-request-error');
const { policies } = require('../../config');
const User = require('../../models/user');
const Movie = require('../../models/movie');

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
        const { email, password, name } = req.body;
        const user_exists = await User.findOne({ email });

        if (user_exists) {
            return next(new BadRequestError("Email is in use"));
        }

        const all_movies = await Movie.find({});

        let random_movies = [];

        for (let obj of all_movies) {
            let num_movies = 2;

            for (let i = 0; i < num_movies; i++) {
                let rand_index = randRange(0, 19);

                let movie_obj = {
                    genre: obj.genre,
                    ...obj.movies[rand_index]
                }

                if (!random_movies.find(movie => movie.title === movie_obj.title)) {
                    random_movies.push(movie_obj);
                }
            }
        }

        const user = User.build({ email, password, name, recommendations: random_movies });
        await user.save();
        const userJWT = generateAccessToken({
            id: user.id,
            email: user.email,
            name: user.name
        });

        res.status(201).send({
            user,
            token: userJWT
        });
    }
);

module.exports = { signupRouter: router };