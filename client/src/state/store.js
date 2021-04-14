import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import hotDogReducer from './slice';

const initialState = {};

export const history = createBrowserHistory();

const reducer = {
  hotDogs: hotDogReducer,
  router: connectRouter(history)
};

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(logger)
    .concat(routerMiddleware(history)),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState
});
