const BaseError = require('./base.errors');

class ValidationError extends BaseError {
  constructor(message) {
    super(message, 200);
  }
}

module.exports = ValidationError;