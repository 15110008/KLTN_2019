const BaseError = require('./base.errors');

class UnauthorizedError extends BaseError {
  constructor(message) {
    super(message, 200);
  }
}

module.exports = UnauthorizedError;