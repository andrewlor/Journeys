import React from 'react';
import {
  KeyboardAvoidingView,
  ImageBackground,
  View,
  StyleSheet,
  Form,
  TextInput,
  Text,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Title1, Button, Body, DefaultTheme } from 'react-native-ios-kit';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Actions } from 'react-native-router-flux';

import { login, clearAuthError } from '../../actions';
import Tabs from '../tabs';
import { Spinner } from '../../ui';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(DefaultTheme);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    let isLoggingIn = this.props.isLoading && !nextProps.isLoading && nextProps.user;
    let wasLoggedIn = nextProps.authToken && nextProps.client && nextProps.uid;
    if (isLoggingIn || wasLoggedIn) {
      Actions.replace('tabs');
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
    this.setState({ email: '', password: '' });
  }

  _submit = () => {
    let email = this.state.email;
    let password = this.state.password;

    let errors = [];
    if (email.length < 1) errors.push('Please enter an email.');
    if (password.length < 1) errors.push('Please enter a password.');

    if (errors.length > 0) {
      Alert.alert(
        errors[0],
        null,
        [
          {text: 'Ok'},
        ],
        { cancelable: false }
      );
    } else {
      this.props.login(email, password);
    }
  }

  renderMainContent() {
    if (this.props.isLoading || this.props.authToken) return <Spinner />;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={style.innerFrame}>
          <View style={{height: getStatusBarHeight()}}></View>
          <View style={style.element}>
            <Text style={style.title}>Journeys</Text>
            <Title1 style={{color: 'white', marginTop: 10}}>Your journey begins here.</Title1>
          </View>
          <View style={{flex: 1}}/>
          <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "position" : 'padding'}>
            <View style={style.element}>
              <TextInput
                style={style.input}
                placeholder={"Email"}
                autoCapitalize='none'
                onChangeText={(t) => this.setState({ email: t })}
                underlineColorAndroid={'rgba(0,0,0,0)'}
              />
            </View>
            <View style={style.element}>
              <TextInput
                style={style.input}
                placeholder={"Password"}
                autoCapitalize='none'
                secureTextEntry
                onChangeText={(t) => this.setState({ password: t })}
                underlineColorAndroid={'rgba(0,0,0,0)'}
              />
            </View>
            <View style={style.element}>
              <Button
                rounded
                inverted
                style={style.button}
                onPress={this._submit}
              >
                Login
              </Button>
            </View>
          </KeyboardAvoidingView>
          <View style={style.element}>
            <Body style={{color: DefaultTheme.primaryColor}}>or</Body>
          </View>
          <View style={[style.element, { paddingBottom: 10 }]}>
            <Button
              rounded
              style={style.button}
              onPress={Actions.signup}
            >
              Sign Up
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  render() {
    return(
      <ImageBackground
        style={{ flex: 1, width: null, height: null }}
        blurRadius={2}
        source={require('../../../assets/images/alberta.jpg')}
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
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerFrame: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 15,
    backgroundColor: 'white',
    borderRadius: 5
  },
  button: {
    width: '100%',
    padding: 10
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    user: state.user,
    authToken: state.authToken,
    client: state.client,
    uid: state.uid,
    authError: state.authError
  };
};

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  clearAuthError: () => dispatch(clearAuthError())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
