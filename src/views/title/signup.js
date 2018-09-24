import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  ImageBackground,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Title2, Button, DefaultTheme } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';

import { Spinner, Topbar } from '../../ui';
import { signup, clearSignUpError } from '../../actions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      nickname: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authToken) {
      this.setState({ email: '', password: '', confirm_password: '', nickname: '' });
      Actions.pop();
    }
    
    if (nextProps.signupError) {
      Alert.alert(
        'Sign up Error',
        nextProps.signupError.join(', '),
        [
          {text: 'Ok', onPress: () => this.props.clearSignUpError()},
        ],
        { cancelable: false }
      );
    }
  }

  _submit = () => {
    let email = this.state.email;
    let password = this.state.password;
    let confirm_password = this.state.confirm_password;
    let nickname = this.state.nickname;

    let errors = [];
    if (email.length < 1) errors.push('Please enter an email.');
    if (password.length < 1) errors.push('Please enter a password.');
    if (nickname.length < 1) errors.push('Please enter a nickname.');
    if (confirm_password.length < 1) errors.push('Please enter a password confirmation.');
    if (confirm_password !== password) errors.push('Passwords do not match.');

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
      this.props.signup(email, password, confirm_password, nickname);
    }
  }

  render() {
    if (this.props.isLoading) return <Spinner />;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Topbar back style={{ zIndex: 100}}/>
          <View style={[style.element, {padding: 10}]}>
            <Title2 style={{ textAlign: 'center' }}>Sign up for Journeys today to start your self improvement journey.</Title2>
          </View>
          <View style={{flex: 1}}></View>
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
                placeholder={"Username"}
                autoCapitalize='none'
                onChangeText={(t) => this.setState({ nickname: t })}
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
              <TextInput
                style={style.input}
                placeholder={"Confirm Password"}
                autoCapitalize='none'
                secureTextEntry
                onChangeText={(t) => this.setState({ confirm_password: t })}
                underlineColorAndroid={'rgba(0,0,0,0)'}
              />
            </View>
            <View style={[style.element, { paddingBottom: 10}]}>
              <Button
                rounded
                inverted
                style={style.button}
                onPress={this._submit}
              >
                Sign up
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const style = StyleSheet.create({
  element: {
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
    authToken: state.authToken,
    signupError: state.signupError,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = dispatch => ({
  signup: (email, password, confirm_password, nickname) => dispatch(signup(email, password, confirm_password, nickname)),
  clearSignUpError: () => dispatch(clearSignUpError())
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
