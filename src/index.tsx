import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { preloadedState, reducer } from 'store';
import { Home } from 'Home';

const store = configureStore({ preloadedState, reducer });

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
