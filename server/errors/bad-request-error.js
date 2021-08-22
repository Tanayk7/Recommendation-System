const CustomError = require('./CustomError');

class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(message) {
        super(message);
    }

    serializeErrors() {
        return [{ message: this.message }]
    }
}

module.exports = BadRequestError;