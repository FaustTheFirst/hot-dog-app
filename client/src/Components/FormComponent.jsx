import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const FormComponent = ({ data, setInput, setIsValid }) => {
  const [errorState, setErrorState] = useState({
    name: null,
    price: null,
    imgURL: null,
    description: null
  });

  const nameValidation = value => {
    if (typeof value !== 'string') return 'Must be a string';
    if (value.length === 0) return 'Field is required';
    if (value.length < 3 || value.length > 16) return 'Must be more than 3 and less than 16 symbols';
    return null;
  };

  const priceValidation = value => {
    if (Number.isNaN(+value)) return 'Must be a number';
    if (+value <= 0) return 'Must be greater than zero';
    if (+value > 100) return 'Must be less than 100';
    return null;
  };

  const reg = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

  const imgURLValidation = value => {
    if (typeof value !== 'string') return 'Must be a string';
    if (!value.match(reg)) return 'Invalid URL format';
    return null;
  };

  const descriptionValidation = value => {
    if (typeof value !== 'string') return 'Must be a string';
    if (value.length > 255) return 'Must be less than 16 symbols';
    return null;
  };

  return (
    <Form style={{ margin: '5%' }}>
      <Form.Input
        label="Name"
        required
        value={data.name}
        error={errorState.name && {
          content: errorState.name,
          pointing: 'left'
        }}
        placeholder="e.g.: Hot Dog"
        onChange={e => {
          setInput({ ...data, name: e.target.value });
          const check = nameValidation(e.target.value);
          setErrorState({ ...errorState, name: check });
          setIsValid(!check);
        }}
        style={{ width: '50%' }}
      />
      <Form.Input
        label="Price"
        required
        value={data.price}
        error={errorState.price && {
          content: errorState.price,
          pointing: 'left'
        }}
        placeholder="0.00"
        onChange={e => {
          setInput({ ...data, price: e.target.value });
          const check = priceValidation(e.target.value);
          setErrorState({ ...errorState, price: check });
          setIsValid(!check);
        }}
        style={{ width: '15%' }}
      />
      <Form.Input
        label="Image"
        value={data.imgURL}
        error={errorState.imgURL && {
          content: errorState.imgURL,
          pointing: 'left'
        }}
        placeholder="e.g: http(s)://example.com/path/to/file.jpg"
        onChange={e => {
          setInput({ ...data, imgURL: e.target.value });
          const check = imgURLValidation(e.target.value);
          setErrorState({ ...errorState, imgURL: check });
          setIsValid(!check);
        }}
        style={{ width: '50%' }}
      />
      <Form.TextArea
        label="Description"
        value={data.description}
        error={errorState.description && {
          content: errorState.description,
          pointing: 'above'
        }}
        placeholder="Max 255 symbols"
        onChange={e => {
          setInput({ ...data, description: e.target.value });
          const check = descriptionValidation(e.target.value);
          setErrorState({ ...errorState, description: check });
          setIsValid(!check);
        }}
      />
    </Form>
  );
};

FormComponent.propTypes = {
  data: PropTypes.exact({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired
  }).isRequired,
  setInput: PropTypes.func.isRequired,
  setIsValid: PropTypes.func.isRequired
};

export default FormComponent;
