import objection from 'objection';

const { DBError } = objection;

export default (err, req, res, next) => {
  if (err instanceof DBError) {
    res.status(500).send({
      message: err.message,
      type: 'UnknownDatabaseError'
    });
  } else {
    next(err);
  }
};
