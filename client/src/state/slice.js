import { createSlice } from '@reduxjs/toolkit';
import { addHotDog, editHotDog, getAllHotDogs, getHotDog, removeHotDog } from './thunks';
import hotDogAdapter from './adapter';

const hotDogSlice = createSlice({
  name: 'hotDog',
  initialState: hotDogAdapter.getInitialState({ status: 'loadingAll', message: null, modal: null }),
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
    [getAllHotDogs.rejected]: state => {
      state.status = 'error';
      state.message = 'Cannot load data';
    },
    [getHotDog.pending]: state => {
      state.status = 'loadingOne';
    },
    [getHotDog.fulfilled]: state => {
      state.status = 'idle';
    },
    [getHotDog.rejected]: state => {
      state.status = 'idle';
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

export const {
  openModal,
  closeModal,
  dissmissMessage
} = hotDogSlice.actions;

export default hotDogSlice.reducer;
