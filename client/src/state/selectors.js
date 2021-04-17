import { createDraftSafeSelector } from '@reduxjs/toolkit';
import hotDogAdapter from './adapter';

const selector = hotDogAdapter.getSelectors(state => state.hotDogs);

export const { selectIds, selectEntities, selectAll, selectById } = selector;

const getRootState = state => state;

export const getEntityById = id => createDraftSafeSelector(getRootState,
  state => selectById(state, id));

export const getModal = () => createDraftSafeSelector(getRootState, state => state.hotDogs.modal);

export const getStatus = () => createDraftSafeSelector(getRootState,
  state => state.hotDogs.status);

export const getMessage = () => createDraftSafeSelector(getRootState,
  state => state.hotDogs.message);
