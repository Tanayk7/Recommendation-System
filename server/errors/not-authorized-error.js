const CustomError = require("./CustomError");

class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super("Not authorized");
    }

    serializeErrors() {
        return [{ message: this.message }]
    }
}

module.exports = NotAuthorizedError;