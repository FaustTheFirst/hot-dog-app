import { createDraftSafeSelector, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { addHotDog, editHotDog, getAllHotDogs, getHotDog, removeHotDog } from './thunks';

const hotDogAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at)
});
/* eslint-disable no-param-reassign */
const hotDogSlice = createSlice({
  name: 'hotDog',
  initialState: hotDogAdapter.getInitialState({ status: 'idle', message: null, modal: null }),
  reducers: {
    openModal: (state, { payload }) => {
      state.modal = payload;
    },
    closeModal: state => {
      state.modal = null;
    },
    dissmissMessage: state => {
      state.status = 'idle';
      state.message = null;
    }
  },
  extraReducers: {
    [getAllHotDogs.pending]: state => {
      state.status = 'loadingAll';
    },
    [getAllHotDogs.fulfilled]: (state, { payload }) => {
      state.status = 'idle';
      hotDogAdapter.setAll(state, payload);
    },
    [getAllHotDogs.rejected]: (state, { payload }) => {
      state.status = 'error';
      state.message = `Cannot load data: ${payload.type}`;
    },
    [getHotDog.pending]: state => {
      state.status = 'loadingOne';
    },
    [getHotDog.fulfilled]: state => {
      state.status = 'success';
      state.message = 'Hot dog found';
    },
    [getHotDog.rejected]: (state, { payload }) => {
      state.status = 'error';
      state.message = `Cannot load hot dog: ${payload.type}`;
    },
    [addHotDog.pending]: state => {
      state.status = 'creating';
    },
    [addHotDog.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.message = 'Hot dog created successfully';
      hotDogAdapter.addOne(state, payload);
    },
    [addHotDog.rejected]: (state, { payload }) => {
      state.status = 'error';
      state.message = `Cannot create hot dog: ${payload.type}`;
    },
    [editHotDog.pending]: state => {
      state.status = 'updating';
    },
    [editHotDog.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.message = 'Hot dog updated successfully';
      const { id, ...changes } = payload;
      hotDogAdapter.updateOne(state, { id, changes });
    },
    [editHotDog.rejected]: (state, { payload }) => {
      state.status = 'error';
      state.message = `Cannot update hot dog: ${payload.type}`;
    },
    [removeHotDog.pending]: state => {
      state.status = 'deleting';
    },
    [removeHotDog.fulfilled]: (state, { meta }) => {
      state.status = 'success';
      state.message = 'Hot dog deleted successfully';
      const { arg } = meta;
      hotDogAdapter.removeOne(state, arg);
    },
    [removeHotDog.rejected]: (state, { payload }) => {
      state.status = 'error';
      state.message = `Cannot delete hot dog: ${payload.type}`;
    }
  }
});

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

export const {
  openModal,
  closeModal,
  dissmissMessage
} = hotDogSlice.actions;

export default hotDogSlice.reducer;
