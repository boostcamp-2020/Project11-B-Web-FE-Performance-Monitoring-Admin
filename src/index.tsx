import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from './modules';
import App from './App';
import GlobalTheme from './globalStyle';

const middleWares =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(ReduxThunk, logger))
    : applyMiddleware(ReduxThunk);

const store = createStore(rootReducer, middleWares);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={GlobalTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
