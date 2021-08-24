const { signupRouter } = require('./auth/signup');
const { signinRouter } = require('./auth/signin');
const { currentUserRouter } = require('./auth/current-user');
const { addMoviesRouter } = require('./movies/add-movie');
const { deleteMoviesRouter } = require('./movies/delete-movie');
const { getMoviesRouter } = require('./movies/get-movies');

module.exports = {
    signupRouter,
    signinRouter,
    currentUserRouter,
    addMoviesRouter,
    deleteMoviesRouter,
    getMoviesRouter
};
