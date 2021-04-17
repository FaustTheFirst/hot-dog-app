import { createAsyncThunk } from '@reduxjs/toolkit';
import { createOne, deleteOne, getAll, getOne, updateOne } from '../utils/requestHelper';

export const getAllHotDogs = createAsyncThunk(
  'hotdog/getAll',
  (_, { rejectWithValue }) => getAll()
    .then(res => res.data).catch(err => rejectWithValue(err.response.data))
);

export const getHotDog = createAsyncThunk(
  'hotdog/get',
  (name, { rejectWithValue }) => getOne(name)
    .then(res => res.data).catch(err => rejectWithValue(err.response.data))
);

export const addHotDog = createAsyncThunk(
  'hotdog/add',
  (body, { rejectWithValue }) => createOne(body)
    .then(res => res.data).catch(err => rejectWithValue(err.response.data))
);

export const editHotDog = createAsyncThunk(
  'hotdog/edit',
  (idAndBody, { rejectWithValue }) => updateOne(idAndBody)
    .then(res => res.data).catch(err => rejectWithValue(err.response.data))
);

export const removeHotDog = createAsyncThunk(
  'hotdog/remove',
  (id, { rejectWithValue }) => deleteOne(id)
    .then(res => res.data).catch(err => rejectWithValue(err.response.data))
);
