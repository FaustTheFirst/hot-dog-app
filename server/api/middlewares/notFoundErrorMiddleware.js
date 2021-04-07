import objection from 'objection';

const { NotFoundError } = objection;

export default (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send({
      message: err.message,
      type: 'NotFound'
    });
  } else {
    next(err);
  }
};
