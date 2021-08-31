// installed modules
require('dotenv').config();
const express = require('express');
const { body } = require('express-validator');

// user defined modules 
const validateRequest = require('../../middleware/validateRequest');
const Movie = require('../../models/movie');

// global initialization
const router = express.Router();
const route = '/api/users/search-movies';

const validation_rules = [
    body('query').notEmpty().withMessage("query cannot be empty"),
]

const middlewares = [
    ...validation_rules,
    validateRequest
];

router.post(
    route,
    ...middlewares,
    async (req, res) => {
        const { query } = req.body;
        const results = await Movie.find({});
        const search_results = [];

        for (let obj of results) {
            for (let movie of obj.movies) {
                if (movie.title.toUpperCase().includes(query.toUpperCase())) {
                    if (!search_results.includes(JSON.stringify(movie))) {
                        search_results.push(JSON.stringify(movie));
                    }
                }
            }
        }

        for (let i = 0; i < search_results.length; i++) {
            search_results[i] = JSON.parse(search_results[i]);
        }

        res.status(200).send(search_results);
    }
)

module.exports = { searchMoviesRouter: router };
