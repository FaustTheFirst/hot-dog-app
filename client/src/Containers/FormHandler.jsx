import React, { useEffect, useMemo, useState } from 'react';
import { isFulfilled, isRejected } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'semantic-ui-react';
import { getModal, getStatus } from '../state/selectors';
import validationFunctions from '../helpers/validationFunctions';
import modalTypes from '../helpers/modalTypes';
import { closeModal } from '../state/slice';
import { getHotDog } from '../state/thunks';

const FormHandler = () => {
  const dispatch = useDispatch();
  const modal = useSelector(getModal());
  const statusFromStore = useSelector(getStatus());
  const [isValid, setIsValid] = useState(false);
  const memoDefaultModal = useMemo(() => ({
    data: {
      name: '',
      price: '',
      imgURL: null,
      description: null
    },
    type: 'Create'
  }), []);

  const [input, setInput] = useState({ ...memoDefaultModal.data });
  const [modalType, setModalType] = useState(memoDefaultModal.type);
  const [errorState, setErrorState] = useState({
    name: null,
    price: null,
    imgURL: null,
    description: null
  });

  const {
    data = memoDefaultModal.data,
    type = memoDefaultModal.type
  } = modal ?? memoDefaultModal;

  const initialName = data.name;

  useEffect(() => {
    setInput({ ...data });
    setModalType(type);
  }, [data, type]);

  const { name, price, imgURL, description } = input;

  const validation = (value, parameter, validationFn) => {
    const check = validationFn(value);
    setErrorState(state => ({ ...state, [parameter]: check }));
    return !check;
  };

  const checkIfNameNotUnique = value => dispatch(getHotDog(value))
    .then(res => (isRejected(res) ? res.payload.message : null));

  const beforeSubmit = properties => {
    const checkAll = Object.entries(properties)
      .filter(item => item[0] !== 'id')
      .map(item => validation(item[1], item[0], validationFunctions[item[0]]));
    return checkAll.every(item => item !== false);
  };

  return (
    <>
      <Modal.Description>
        <Form style={{ margin: '5%' }}>
          <Form.Input
            label="Name"
            required
            value={name}
            loading={statusFromStore === 'loadingOne'}
            error={errorState.name && {
              content: errorState.name,
              pointing: 'left'
            }}
            placeholder="e.g.: Hot Dog"
            onChange={e => {
              setInput({ ...input, name: e.target.value });
              validation(e.target.value, 'name', validationFunctions.name);
            }}
            onBlur={e => {
              const check = validation(e.target.value, 'name', validationFunctions.name);
              if (check && e.target.value !== initialName) {
                checkIfNameNotUnique(e.target.value)
                  .then(res => {
                    setErrorState({ ...errorState, name: res });
                    setIsValid(!res);
                  });
                return;
              }
              setIsValid(check);
            }}
            style={{ width: '50%' }}
          />
          <Form.Input
            label="Price"
            required
            value={price}
            error={errorState.price && {
              content: errorState.price,
              pointing: 'left'
            }}
            placeholder="0.00"
            onChange={e => {
              setInput({ ...input, price: e.target.value });
              validation(e.target.value, 'price', validationFunctions.price);
            }}
            onBlur={e => {
              const check = validation(e.target.value, 'price', validationFunctions.price);
              setIsValid(check);
            }}
            style={{ width: '15%' }}
          />
          <Form.Input
            label="Image"
            value={imgURL || ''}
            error={errorState.imgURL && {
              content: errorState.imgURL,
              pointing: 'left'
            }}
            placeholder="e.g: http(s)://example.com/path/to/file.jpg"
            onChange={e => {
              setInput({ ...input, imgURL: e.target.value });
              validation(e.target.value, 'imgURL', validationFunctions.imgURL);
            }}
            onBlur={e => {
              const check = validation(e.target.value, 'imgURL', validationFunctions.imgURL);
              setIsValid(check);
            }}
            style={{ width: '50%' }}
          />
          <Form.TextArea
            label="Description"
            value={description || ''}
            error={errorState.description && {
              content: errorState.description,
              pointing: 'above'
            }}
            placeholder="Max 128 symbols"
            onChange={e => {
              setInput({ ...input, description: e.target.value });
              validation(e.target.value, 'description', validationFunctions.description);
            }}
            onBlur={e => {
              const check = validation(e.target.value, 'description', validationFunctions.description);
              setIsValid(check);
            }}
          />
        </Form>
      </Modal.Description>
      <Modal.Actions>
        {modalTypes[modalType].map(({ buttonName, color, fn, status, canDisable }) => (
          <Button
            key={buttonName}
            content={buttonName}
            color={color}
            disabled={canDisable && !isValid}
            loading={statusFromStore === status}
            onClick={() => {
              const checkAll = beforeSubmit(input);
              if (checkAll) {
                const convertPrice = { ...input, price: +input.price };
                dispatch(fn(convertPrice))
                  .then(res => (isFulfilled(res) ? dispatch(closeModal()) : null));
              }
              setIsValid(checkAll);
            }}
          />
        ))}
      </Modal.Actions>
    </>
  );
};

export default FormHandler;
