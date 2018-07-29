import React, { Component } from 'react';
import Login from './views/login.js';
import { NavigatorIOS, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';

import { reauth } from './actions';

class AppRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      'pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
    });

    this.setState({ fontsLoaded: true });

    try {
      const value = await AsyncStorage.getItem('@Journeys:AUTH');
      if (value !== null) {
        console.log("SUCCESS FETCHING STORAGE");
        console.log(value);
        let AUTH = JSON.parse(value);
        this.props.reauth(AUTH.authToken, AUTH.client, AUTH.uid);
      }
    } catch (error) {
      console.log("ERROR FETCHING STORAGE: " + error);
    }
  }

  render() {
    if (this.state.fontsLoaded) {
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


const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => ({
  reauth: (authToken, client, uid) => dispatch(reauth(authToken, client, uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
