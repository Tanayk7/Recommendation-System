const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const errorHandler = require('./middleware/errorHandler.js');
const {
    signupRouter,
    signinRouter,
    currentUserRouter,
    addMoviesRouter,
    deleteMoviesRouter,
    getMoviesRouter,
    getUserMoviesRouter,
    getUserRecommendationsRouter,
    searchMoviesRouter
} = require('./routes');

const app = express();

app.use(cors());
app.set('trust proxy', true);
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'T.K.FKO.12');
    next();
});
app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(addMoviesRouter);
app.use(deleteMoviesRouter);
app.use(getMoviesRouter);
app.use(getUserMoviesRouter);
app.use(getUserRecommendationsRouter);
app.use(searchMoviesRouter);
app.use(errorHandler);

module.exports = app;