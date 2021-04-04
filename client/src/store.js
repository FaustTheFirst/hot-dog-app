import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import testReducer from './entity';

const initialState = {};

const reducer = {
  main: testReducer
};

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState
});
