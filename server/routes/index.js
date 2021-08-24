const { signupRouter } = require('./auth/signup');
const { signinRouter } = require('./auth/signin');
const { currentUserRouter } = require('./auth/current-user');
const { addMoviesRouter } = require('./movies/add-movie');
const { deleteMoviesRouter } = require('./movies/delete-movie');

module.exports = {
    signupRouter,
    signinRouter,
    currentUserRouter,
    addMoviesRouter,
    deleteMoviesRouter
};
