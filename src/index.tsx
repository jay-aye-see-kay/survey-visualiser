import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { preloadedState, reducer } from 'store';
import { Home } from 'pages/Home';
import { Survey } from 'pages/Survey';

import 'style.css';

const store = configureStore({ preloadedState, reducer });

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/surveys/:id"><Survey /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
