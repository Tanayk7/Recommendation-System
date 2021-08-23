const { signupRouter } = require('./auth/signup');
const { signinRouter } = require('./auth/signin');
const { currentUserRouter } = require('./auth/current-user');

module.exports = {
    signupRouter,
    signinRouter,
    currentUserRouter
};
