require('dotenv').config();
const express = require('express');
const BadRequestError = require('../../errors/bad-request-error');

const requireAuth = require('../../middleware/require-auth');
const { currentUser2 } = require('../../middleware/current-user');
const User = require('../../models/user');

const router = express.Router();
const route = '/api/users/add-movies';
const middlewares = [currentUser2, requireAuth];

router.post(
    route,
    ...middlewares,
    async (req, res, next) => {
        const { userId, movies } = req.body;
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return next(new BadRequestError("Invalid user id"));
        }
        if (!(Array.isArray(movies) && movies.length > 0) || !movies) {
            return next(new BadRequestError("Bad data sent"));
        }

        let user_movies = [...user.movies, ...movies];

        user.set('movies', user_movies);
        await user.save();

        res.status(201).send(user_movies);
    }
);


module.exports = { addMoviesRouter: router };