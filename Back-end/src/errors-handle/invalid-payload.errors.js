const BaseError = require('./base.errors');

class InvalidPayloadError extends BaseError {
  constructor(message) {
    super(message, 200);
  }
}

module.exports = InvalidPayloadError;