import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from '../state/store';
import Routing from '../Components/Routing';

const Main = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routing />
    </ConnectedRouter>
  </Provider>
);

export default Main;
