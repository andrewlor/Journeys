import React from 'react';
import {
  KeyboardAvoidingView,
  ImageBackground,
  View,
  StyleSheet,
  Form,
  TextInput,
  Text
} from 'react-native';
import Main from './main';
import { Button } from 'react-native-ios-kit';
import { connect } from 'react-redux';

import { setEmail, setPassword, login } from '../actions';

class Login extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoading && !nextProps.isLoading && nextProps.user) {
      this.props.navigator.push(nextRoute);
    }
  }
  
  render() {
    return(
      <ImageBackground
        style={{ flex: 1, width: null, height: null }}
        blurRadius={2}
        source={require('../../assets/images/alberta.jpg')}
      >
        <View style={style.innerFrame}>
          <KeyboardAvoidingView style={{flex: 3}} behavior='position'>
            <View style={[style.element, {padding: 40}]}>
              <Text style={style.title}>Journeys</Text>
            </View>
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
            <View style={style.element}>
              <Button
                rounded
                inverted
                style={style.button}
                innerStyle={{ fontSize: 20 }}
                onPress={() => this.props.login(this.props.email, this.props.password)}
              >
                Login
              </Button>
            </View>
          </KeyboardAvoidingView>
          <View style={{flex: 1}}></View>
        </View>
      </ImageBackground>
    );
  }
}
/*

*/
const style = StyleSheet.create({
  title: {
    fontSize: 75,
    color: 'white',
    fontFamily: 'pacifico'
  },
  element: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerFrame: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  input: {
    width: 250,
    padding: 20,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 5
  },
  button: {
    width: 250,
    padding: 20
  }
});

const nextRoute = {
  component: Main,
  title: 'main'
}


const mapStateToProps = state => {
  return {
    email: state.email,
    password: state.password,
    isLoading: state.isLoading,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  setEmail: (email) => dispatch(setEmail(email)),
  setPassword: (password) => dispatch(setPassword(password)),
  login: (email, password) => dispatch(login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
