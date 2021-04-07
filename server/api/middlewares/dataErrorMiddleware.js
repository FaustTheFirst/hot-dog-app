import objection from 'objection';

const { DataError } = objection;

export default (err, req, res, next) => {
  if (err instanceof DataError) {
    res.status(400).send({
      message: err.message,
      type: 'InvalidData'
    });
  } else {
    next(err);
  }
};
