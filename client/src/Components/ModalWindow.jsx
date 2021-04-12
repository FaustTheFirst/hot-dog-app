import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { isFulfilled } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getModal, getStatus } from '../entity';
import { addHotDog, editHotDog, removeHotDog } from '../thunks';
import FormComponent from './FormComponent';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const statusFromStore = useSelector(getStatus());
  const modal = useSelector(getModal());
  const defaultModal = {
    data: {
      name: '',
      price: '',
      imgURL: '',
      description: ''
    },
    type: 'Create'
  };

  const [input, setInput] = useState(defaultModal);
  const [isValid, setIsValid] = useState(true);
  useEffect(() => {
    const { data = defaultModal.data, type = defaultModal.type } = modal ?? defaultModal;
    setInput({ data, type });
    setIsValid(true);
  }, [modal]);
  const modalTypes = {
    Create: [
      {
        fn: body => dispatch(addHotDog(body)),
        name: 'create',
        color: 'green',
        status: 'creating',
        canDisable: true
      }
    ],
    Update: [
      {
        fn: ({ id, ...body }) => dispatch(editHotDog({ id, body })),
        name: 'edit',
        color: 'blue',
        status: 'updating',
        canDisable: true
      },
      {
        fn: ({ id }) => dispatch(removeHotDog(id)),
        name: 'delete',
        color: 'red',
        status: 'deleting',
        canDisable: false
      }
    ]
  };

  const closeFn = () => dispatch(closeModal());
  return (
    <Modal
      onClose={() => closeFn()}
      open={!!modal}
    >
      <Modal.Header>
        {`${input.type} hot dog`}
      </Modal.Header>
      <Modal.Description>
        <FormComponent
          data={input.data}
          setInput={data => setInput({ ...input, data })}
          setIsValid={setIsValid}
        />
      </Modal.Description>
      <Modal.Actions>
        {modalTypes[input.type].map(({ name, color, fn, status, canDisable }) => (
          <Button
            key={name}
            content={name}
            color={color}
            disabled={canDisable && !isValid}
            loading={statusFromStore === status}
            onClick={() => {
              fn(input.data).then(res => (isFulfilled(res) ? closeFn() : null));
            }}
          />
        ))}
      </Modal.Actions>
    </Modal>
  );
};

export default ModalWindow;
