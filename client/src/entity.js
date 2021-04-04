import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import getTest from './requestHelper';

export const fetchTest = createAsyncThunk(
  'testCall',
  async () => {
    const payload = await getTest();

    const { data } = payload;

    return data;
  }
);

const testAdapter = createEntityAdapter({});

const testSlice = createSlice({
  name: 'test',
  initialState: testAdapter.getInitialState(),
  reducers: {
    getAllStates: testAdapter.addOne
  },
  extraReducers: {
    [fetchTest.fulfilled](state, { payload }) {
      testAdapter.setAll(state, payload);
    }
  }
});

export const select = testAdapter.getSelectors(
  state => state.main
);

export const { getAllStates } = testSlice.actions;

export default testSlice.reducer;
