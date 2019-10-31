const BaseError = require('./base.errors');

class AlreadyExistError extends BaseError {
    constructor(message) {
        super(message, 200);
    }
}

module.exports = AlreadyExistError;
