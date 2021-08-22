const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const errorHandler = require('./middleware/errorHandler.js');
const { currentUserRouter } = require('./routes/users/current-user');

const app = express();

//app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieSession({
    signed: false,
    secure: "test"
}));
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'T.K-KF012');
    next();
});
app.use(currentUserRouter);
app.use(errorHandler);

module.exports = app;