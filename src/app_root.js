import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

import { reauth } from './actions';
import Login from './views/login';
import Tabs from './views/tabs';
import Journey from './views/journey';
import Settings from './views/settings';
import Signup from './views/signup';
import Welcome from './views/welcome';

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
    var sceneConfig = {
      panHandlers: null,
      hideNavBar: true
    };
    
    if (this.state.fontsLoaded) {
      return (
        <Router>
          <Scene key="modal" modal {...sceneConfig}>
            <Scene key="welcome" component={Welcome} {...sceneConfig} />
            <Scene key="root" initial>
              <Scene key="login" component={Login} initial {...sceneConfig} />
              <Scene key="tabs" component={Tabs} {...sceneConfig} />
              <Scene key="journey" component={Journey} {...sceneConfig} />
              <Scene key="signup" component={Signup} {...sceneConfig} />
            </Scene>
          </Scene>
        </Router>
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
