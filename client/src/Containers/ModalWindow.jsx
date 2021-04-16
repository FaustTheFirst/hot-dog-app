import React from 'react';
import { Modal } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../state/slice';
import FormHandler from './FormHandler';
import { getModal } from '../state/selectors';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const modalFromStore = useSelector(getModal());
  return (
    <Modal
      onClose={() => dispatch(closeModal())}
      open={!!modalFromStore}
    >
      <Modal.Header>
        {`${modalFromStore?.type || 'Create'} hot dog`}
      </Modal.Header>
      <FormHandler />
    </Modal>
  );
};

export default ModalWindow;
