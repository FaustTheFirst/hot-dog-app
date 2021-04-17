export default (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else {
    res.status(500).send({
      message: err.message,
      type: 'UnknownError',
      data: err.data
    });
  }
};
