import React, { Component } from 'react';
import Login from './views/login.js';
import { NavigatorIOS } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';

export default class AppRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      'pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <NavigatorIOS
          initialRoute={{
            component: Login,
            title: 'login'
          }}
          style={{flex: 1}}
          navigationBarHidden={true}
        />
      );
    } else {
      return null;
    }
  }
}
