import React from 'react';
import PropTypes from 'prop-types';

const Sample = ({ id, name, createdAt }) => (
  <div>
    <p>
      id:
      {id}
    </p>
    <p>
      name:
      {name}
    </p>
    <p>
      createdAt:
      {createdAt}
    </p>
  </div>
);

Sample.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default Sample;
