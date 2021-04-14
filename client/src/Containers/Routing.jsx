import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../Pages/NotFound';
import App from './App';

const Routing = () => (
  <>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="*" component={NotFound} />
    </Switch>
  </>
);

export default Routing;
