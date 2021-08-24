// installed modules
require('dotenv').config();
const express = require('express');
const { body } = require('express-validator');

// user defined modules 
const validateRequest = require('../../middleware/validateRequest');
const Movie = require('../../models/movie');

// global initialization
const router = express.Router();
const route = '/api/users/get-movies';

const validation_rules = [
    body('min').notEmpty().isInt({ min: 0, max: 100 }).withMessage("min must be supplied and must be a positive int not more than record limit"),
    body('max').notEmpty().isInt({ min: 0, max: 100 }).withMessage("max must be supplied and must be a positive int not move than record limit"),
]

const middlewares = [
    ...validation_rules,
    validateRequest
];

router.post(
    route,
    ...middlewares,
    async (req, res) => {
        const { min, max } = req.body;

        // const movies = await Movie.find({}).limit(max).skip(skip).exec();
        const results = await Movie.find({});
        const user_movies = [];

        let movie_count = 0;

        for (let obj of results) {
            let movie_obj = { genre: obj.genre, movies: [] };

            for (let i = min; i < max; i++) {
                movie_obj.movies.push(obj.movies[i]);
                movie_count++;
            }

            user_movies.push(movie_obj);
        }

        let response_obj = {
            movies: user_movies,
            total_results: movie_count,
            start: min,
            end: max
        }

        res.status(200).send(response_obj);
    }
)

module.exports = { getMoviesRouter: router };
