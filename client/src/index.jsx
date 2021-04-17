import React from 'react';
import { render } from 'react-dom';
import Main from './Pages/Main';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';

const root = document.getElementById('root');

render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  root
);

reportWebVitals();
