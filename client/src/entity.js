import { createDraftSafeSelector, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { addHotDog, editHotDog, getAllHotDogs, getHotDog, removeHotDog } from './thunks';

const hotDogAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at)
});
/* eslint-disable no-param-reassign */
const hotDogSlice = createSlice({
  name: 'hotDog',
  initialState: hotDogAdapter.getInitialState({ status: 'idle', modal: undefined }),
  reducers: {
    openCreateModal: (state, { payload }) => {
      state.modal = payload;
    },
    openUpdateModal: (state, { payload }) => {
      state.modal = payload;
    },
    closeModal: state => {
      state.modal = null;
    },
    dissmissMessage: state => {
      state.status = 'idle';
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
    [getAllHotDogs.rejected]: state => {
      state.status = 'error';
    },
    [getHotDog.pending]: state => {
      state.status = 'loadingOne';
    },
    [getHotDog.fulfilled]: state => {
      state.status = 'success';
    },
    [getHotDog.rejected]: state => {
      state.status = 'error';
    },
    [addHotDog.pending]: state => {
      state.status = 'creating';
    },
    [addHotDog.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      hotDogAdapter.addOne(state, payload);
    },
    [addHotDog.rejected]: state => {
      state.status = 'error';
    },
    [editHotDog.pending]: state => {
      state.status = 'updating';
    },
    [editHotDog.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      const { id, ...changes } = payload;
      hotDogAdapter.updateOne(state, { id, changes });
    },
    [editHotDog.rejected]: state => {
      state.status = 'error';
    },
    [removeHotDog.pending]: state => {
      state.status = 'deleting';
    },
    [removeHotDog.fulfilled]: (state, { meta }) => {
      state.status = 'success';
      const { arg } = meta;
      hotDogAdapter.removeOne(state, arg);
    },
    [removeHotDog.rejected]: state => {
      state.status = 'error';
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

export const {
  openCreateModal,
  openUpdateModal,
  closeModal,
  dissmissMessage
} = hotDogSlice.actions;

export default hotDogSlice.reducer;
