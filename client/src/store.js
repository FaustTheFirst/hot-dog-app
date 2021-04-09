import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import hotDogReducer from './entity';

const initialState = {};

const reducer = {
  hotDogs: hotDogReducer
};

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState
});
