import objection from 'objection';

const { ConstraintViolationError } = objection;

export default (err, req, res, next) => {
  if (err instanceof ConstraintViolationError) {
    res.status(400).send({
      message: err.nativeError.detail,
      type: 'ConstraintViolation'
    });
  } else {
    next(err);
  }
};
