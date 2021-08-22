const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler.js');
const BadRequestError = require('./errors/bad-request-error');
const DatabaseConnectionError = require('./errors/database-connection-error.js');
const { body } = require('express-validator');
const validateRequest = require('./middleware/validateRequest');

const app = express();
const validation_rules = [
    body('email').isEmail().withMessage("Email must be valid"),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters")
]

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'T.K-KF012');
    next();
});

// routes for testing custom error responses
app.get("/error-test", (req, res) => {
    throw new BadRequestError("Bad request sent to server");
});
app.get("/rand-error", (req, res) => {
    throw new Error("some error");
});
app.get('/db-error', (req, res) => {
    throw new DatabaseConnectionError();
});
app.post("/validation-err", validation_rules, validateRequest, (req, res) => {
    const { email, password } = req.body;
    console.log("Email: ", email, " Password: ", password);
    res.status(200).send({ message: "request validated successfully" });
});

// custom error handler middleware
app.use(errorHandler);

module.exports = app;
