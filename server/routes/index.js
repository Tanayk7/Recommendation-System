const { signupRouter } = require('./users/signup');
const { signinRouter } = require('./users/signin');
const { currentUserRouter } = require('./users/current-user');

module.exports = {
    signupRouter,
    signinRouter,
    currentUserRouter
};
