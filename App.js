import React, { Component } from 'react';
import AppRoot from './src/app_root.js';
import { ThemeProvider } from 'react-native-ios-kit';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <AppRoot/>
      </ThemeProvider>
    );
  }
}
