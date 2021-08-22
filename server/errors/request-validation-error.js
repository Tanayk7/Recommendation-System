const CustomError = require('./CustomError');

class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors;
    }

    serializeErrors() {
        return this.errors.map(err => ({ message: err.msg, field: err.param }));
    }
}

module.exports = RequestValidationError;