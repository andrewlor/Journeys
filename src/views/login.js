import React from 'react';
import {
  KeyboardAvoidingView,
  ImageBackground,
  View,
  StyleSheet,
  Form,
  TextInput,
  Text,
  Alert
} from 'react-native';
import { Button, Spinner, Body, DefaultTheme } from 'react-native-ios-kit';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Actions } from 'react-native-router-flux';

import { setEmail, setPassword, login, clearAuthError } from '../actions';
import Tabs from './tabs';

class Login extends React.Component {

  componentWillReceiveProps(nextProps) {
    let isLoggingIn = this.props.isLoading && !nextProps.isLoading && nextProps.user;
    let wasLoggedIn = nextProps.authToken && nextProps.client && nextProps.uid;
    if (isLoggingIn || wasLoggedIn) {
      Actions.tabs();
    }
    if (nextProps.authError) {
      Alert.alert(
        'Authentication Error',
        'Invalid email or password.',
        [
          {text: 'Ok', onPress: () => this.props.clearAuthError()},
        ],
        { cancelable: false }
      );
    }
  }

  renderMainContent() {
    if (this.props.isLoading || this.props.authToken) {
      return (
        <View style={[style.innerFrame, {alignItems: 'center', justifyContent: 'center'}]}>
          <Spinner animating={true} />
        </View>
      );
    } else {
      return (
        <View style={style.innerFrame}>
          <View style={{height: getStatusBarHeight()}}></View>
          <View style={[style.element, {padding: 20}]}>
            <Text style={style.title}>Journeys</Text>
          </View>
          <View style={{flex: 1}}></View>
          <KeyboardAvoidingView behavior='position'>
            <View style={style.element}>
              <TextInput
                style={style.input}
                placeholder={"Email"}
                autoCapitalize='none'
                onChangeText={this.props.setEmail}
              />
            </View>
            <View style={style.element}>
              <TextInput
                style={style.input}
                placeholder={"Password"}
                autoCapitalize='none'
                secureTextEntry
                onChangeText={this.props.setPassword}
              />
            </View>
            <View style={[style.element, { paddingBottom: 10}]}>
              <Button
                rounded
                inverted
                style={style.button}
                onPress={() => this.props.login(this.props.email, this.props.password)}
              >
                Login
              </Button>
            </View>
          </KeyboardAvoidingView>
          <View style={[style.element, { paddingBottom: 10, paddingTop: 0}]}>
            <Body style={{color: DefaultTheme.primaryColor}}>or</Body>
          </View>
          <View style={style.element}>
            <Button
              rounded
              style={style.button}
              onPress={null}
            >
              Sign Up
            </Button>
          </View>
          <View style={{height: 30}}></View>
        </View>
      );
    }
  }
  
  render() {
    return(
      <ImageBackground
        style={{ flex: 1, width: null, height: null }}
        blurRadius={2}
        source={require('../../assets/images/alberta.jpg')}
      >
        {this.renderMainContent()}
      </ImageBackground>
    );
  }
}

const style = StyleSheet.create({
  title: {
    fontSize: 50,
    color: 'white',
    fontFamily: 'pacifico'
  },
  element: {
    padding: 5,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerFrame: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  input: {
    width: '100%',
    padding: 15,
    fontSize: 15,
    backgroundColor: 'white',
    borderRadius: 5
  },
  button: {
    width: '100%',
    padding: 15
  }
});

const mapStateToProps = state => {
  return {
    email: state.email,
    password: state.password,
    isLoading: state.isLoading,
    user: state.user,
    authToken: state.authToken,
    client: state.client,
    uid: state.uid,
    authError: state.authError
  };
};

const mapDispatchToProps = dispatch => ({
  setEmail: (email) => dispatch(setEmail(email)),
  setPassword: (password) => dispatch(setPassword(password)),
  login: (email, password) => dispatch(login(email, password)),
  clearAuthError: () => dispatch(clearAuthError())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
