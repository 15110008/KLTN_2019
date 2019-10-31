const BaseError = require('./base.errors');

class ForbiddenError extends BaseError {
  constructor(message) {
    super(message, 200);
  }
}

module.exports = ForbiddenError;