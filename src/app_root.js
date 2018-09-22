import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

import { reauth } from './actions';
import Login from './views/title/login';
import Tabs from './views/tabs';
import Journey from './views/journeys/journey';
import Settings from './views/account/settings';
import Signup from './views/title/signup';
import Welcome from './views/misc/welcome';
import NewJourneyLog from './views/journey_logs/new_journey_log';
import NewJourney from './views/journeys/new_journey';
import NewCommitment from './views/commits/new_commitment';
import CommitPeriods from './views/commits/commit_periods';
import EditJourneyScreen from './views/journeys/edit_journey_screen';

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
        this.props.reauth(AUTH.authToken, AUTH.client, AUTH.uid, AUTH.user);
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
            <Scene key="newJourneyLog" component={NewJourneyLog} {...sceneConfig} />
            <Scene key="newJourney" component={NewJourney} {...sceneConfig} />
            <Scene key="newCommitment" component={NewCommitment} {...sceneConfig} />
            <Scene key="editJourney" component={EditJourneyScreen} {...sceneConfig} />
            <Scene key="root" initial>
              <Scene key="login" component={Login} initial {...sceneConfig} />
              <Scene key="tabs" component={Tabs} {...sceneConfig} />
              <Scene key="journey" component={Journey} {...sceneConfig} />
              <Scene key="signup" component={Signup} {...sceneConfig} />
              <Scene key="commitPeriods" component={CommitPeriods} {...sceneConfig} />
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
  reauth: (authToken, client, uid, user) => dispatch(reauth(authToken, client, uid, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
