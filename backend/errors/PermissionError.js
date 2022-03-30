class PermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PermissionError';
    this.statusCode = 403;
  }
}

module.exports = PermissionError;
