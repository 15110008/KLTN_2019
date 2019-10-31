const BaseError = require('./base.errors');

class NotFoundError extends BaseError {
  constructor(message) {
    super(message, 200);
  }
}

module.exports = NotFoundError;