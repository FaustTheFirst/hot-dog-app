import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isFulfilled } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getStatus } from '../entity';
import { addHotDog, editHotDog, removeHotDog } from '../thunks';

const ModalWindow = ({ obj }) => {
  const dispatch = useDispatch();
  const statusFromStore = useSelector(getStatus());
  const { data, type } = obj;
  const [input, setInput] = useState(data);
  const modalTypes = {
    Create: [
      {
        fn: body => dispatch(addHotDog(body)),
        name: 'create',
        color: 'green',
        status: 'creating'
      }
    ],
    Update: [
      {
        fn: ({ id, ...body }) => dispatch(editHotDog({ id, body })),
        name: 'edit',
        color: 'blue',
        status: 'updating'
      },
      {
        fn: ({ id }) => dispatch(removeHotDog(id)),
        name: 'delete',
        color: 'red',
        status: 'deleting'
      }
    ]
  };

  const closeFn = () => dispatch(closeModal());

  return (
    <Modal
      onClose={() => closeFn()}
      open
    >
      <Modal.Header>
        {type}
        hotdog
      </Modal.Header>
      <Modal.Description>
        <Form>
          <Form.Input
            label="Name"
            value={input.name}
            onChange={e => setInput({ ...input, name: e.target.value })}
          />
          <Form.Input
            label="Price"
            value={input.price}
            onChange={e => setInput({ ...input, price: e.target.value })}
          />
          <Form.Input
            label="Description"
            value={input.description}
            onChange={e => setInput({ ...input, description: e.target.value })}
          />
          <Form.Input
            label="Image"
            value={input.imgURL}
            onChange={e => setInput({ ...input, imgURL: e.target.value })}
          />
        </Form>
      </Modal.Description>
      <Modal.Actions>
        {modalTypes[type].map(({ name, color, fn, status }) => (
          <Button
            key={name}
            content={name}
            color={color}
            loading={statusFromStore === status}
            onClick={() => {
              fn(input).then(res => (isFulfilled(res) ? closeFn() : null));
            }}
          />
        ))}
      </Modal.Actions>
    </Modal>
  );
};

ModalWindow.propTypes = {
  obj: PropTypes.exact({
    data: PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      imgURL: PropTypes.string
    }),
    type: PropTypes.string
  })
};

ModalWindow.defaultProps = {
  obj: {
    data: {
      name: '',
      price: '',
      description: '',
      imgURL: ''
    },
    type: ''
  }
};

export default ModalWindow;