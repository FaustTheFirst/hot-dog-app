import objection from 'objection';

const { ValidationError } = objection;

export default (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).send({
      message: err.message,
      type: 'ValidationError',
      data: err.data
    });
  } else {
    next(err);
  }
};
