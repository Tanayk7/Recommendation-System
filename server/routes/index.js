const { signupRouter } = require('./auth/signup');
const { signinRouter } = require('./auth/signin');
const { currentUserRouter } = require('./auth/current-user');
const { addMoviesRouter } = require('./movies/add-movie');
const { deleteMoviesRouter } = require('./movies/delete-movie');
const { getMoviesRouter } = require('./movies/get-movies');
const { getUserMoviesRouter } = require('./movies/get-user-movies');
const { getUserRecommendationsRouter } = require("./movies/get-user-recommendations");
const { searchMoviesRouter } = require('./movies/search-movies');

module.exports = {
    signupRouter,
    signinRouter,
    currentUserRouter,
    addMoviesRouter,
    deleteMoviesRouter,
    getMoviesRouter,
    getUserMoviesRouter,
    getUserRecommendationsRouter,
    searchMoviesRouter
};
