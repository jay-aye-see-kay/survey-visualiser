import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { preloadedState, reducer } from 'store';

const store = configureStore({ preloadedState, reducer });

const App = () => {
  return (
    <Provider store={store}>
      <div> test </div>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
