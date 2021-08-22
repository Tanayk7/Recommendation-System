const CustomError = require('../errors/CustomError');

const errorHandler = (err, req, res, next) => {
    console.log("Error handler called !");

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors: [{ message: "An unknown error occured" }]
    });
}

module.exports = errorHandler;