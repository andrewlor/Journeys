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
//import Main from './Main.js';
//import Title from '../Text/Title.js';
//import TextInput from '../Input/Text.js';
//import Button from '../Input/Button.js';
import { Button } from 'react-native-ios-kit';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }
  
  login = () => {
    //if(this.state.username.length == 0 || this.state.password.length == 0) {
    //  alert('Username or Password can not be empty.');
    //} else {
      this.props.navigator.push(nextRoute);
    //}
  }

  updateUsername = (text) => {
    this.setState({username: text});
  }

  updatePassword = (text) => {
    this.setState({password: text});
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
                onChangeText={this.updateUsername}
              />
            </View>
            <View style={style.element}>
              <TextInput
                style={style.input}
                placeholder={"Password"}
                autoCapitalize='none'
                secureTextEntry    
                onChangeText={this.updatePassword}
              />
            </View>
            <View style={style.element}>
              <Button
                rounded
                inverted
                style={style.button}
                innerStyle={{ fontSize: 20 }}
                onPress={this.login}
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
//  component: Main,
//  title: 'main'
}
