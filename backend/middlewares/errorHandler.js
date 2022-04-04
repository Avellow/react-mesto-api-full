const errorHandler = (err, req, res, next) => {
  const {
    statusCode = 500,
    message = 'Произошла ошибка на сервере',
  } = err;

  console.log(err.stack || err);

  res
    .status(statusCode)
    .send({
      message: `${statusCode} ${message}`,
    });
};

module.exports = errorHandler;
