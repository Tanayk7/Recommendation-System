const CustomError = require('./CustomError');

class DatabaseConnectionError extends CustomError {
    statusCode = 500;

    constructor() {
        super('Error connecting to database');
    }

    serializeErrors() {
        return [
            { message: this.message }
        ];
    }
}

module.exports = DatabaseConnectionError;