import React, { Component } from 'react';
import AppRoot from './src/app_root.js';
import { ThemeProvider } from 'react-native-ios-kit';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './src/reducer.js';
import thunkMiddleware from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <AppRoot/>
        </ThemeProvider>
      </Provider>
    );
  }
}
