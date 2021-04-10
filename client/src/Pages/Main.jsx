import React from 'react';
import { Provider } from 'react-redux';
import Notification from '../Components/Notification';
import App from '../Containers/App';
import store from '../store';

const Main = () => (
  <Provider store={store}>
    <App />
    <Notification />
  </Provider>
);

export default Main;
