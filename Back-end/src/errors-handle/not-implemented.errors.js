const BaseError = require('./base.errors');

class NotImplemented extends BaseError {
  constructor(message) {
    super(message, 200);
  }
}

module.exports = NotImplemented;