class TokenCheckError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TokenCheckError';
    this.statusCode = 401;
  }
}

module.exports = TokenCheckError;
