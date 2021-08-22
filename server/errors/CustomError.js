class CustomError extends Error {
    statusCode = 400;

    constructor(message) {
        super(message);
    }

    serializeErrors(message, field) {
        throw new Error("Method 'serializeErrors()' must be implemented.");
    }
}

module.exports = CustomError;