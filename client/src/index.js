import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* For UI */
import 'antd/dist/antd.css';

/* For Redux */
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import Reducer from './_reducer';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);

ReactDOM.render(
  <Provider
    store={
      createStoreWithMiddleware(
        Reducer, 
        window.__REDUX_DEVTOOLS_EXTENSION__  && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    }
  >
    <App />
  </Provider>,
  document.getElementById('root')
);